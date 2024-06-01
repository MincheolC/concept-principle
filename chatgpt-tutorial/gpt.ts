import OpenAI from "openai";
import _ from "lodash";

/**
 * Type & Interface
 */
export type GPTModel = "gpt-3.5-turbo";
export type GPTPromptRole = "system" | "assistant" | "user";

export interface IPromptSet {
  version: string;
  model: GPTModel;
  prompts: {
    brainstormingHelper: IPrompt[];
    introsectionGenerator: IPrompt[];
    draftGenerator: IPrompt[];
  };
}

export interface IPrompt {
  id: string;
  role: GPTPromptRole;
  temperature: number;
  content: string;
}

export interface IMessageUnit {
  role: GPTPromptRole;
  content: string;
}

export type Messages = IMessageUnit[];

export interface IChatCompletionData {
  key?: string;
  orderNumber?: number;
  messages: IMessageUnit[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Functions
 */

export function createChatCompletionStreamingParams(
  model: GPTModel,
  prompt: IPrompt,
  messages: Messages
): OpenAI.ChatCompletionCreateParamsStreaming {
  const newMessage = _.omit(prompt, ["id", "temperature"]);

  return {
    model,
    messages: [...messages, newMessage],
    temperature: prompt.temperature,
    stream: true,
    stream_options: {
      include_usage: true,
    },
  };
}

async function chatCompletionStreaming(
  option: OpenAI.ChatCompletionCreateParamsStreaming
): Promise<IChatCompletionData | undefined> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let result;
  const chunks = [];
  const stream = await openai.chat.completions.create(option);

  for await (const chunk of stream) {
    if (chunk.choices && chunk.choices.length > 0) {
      chunks.push(chunk.choices[0]?.delta?.content || "");
    }

    if (chunk.usage) {
      result = {
        messages: [
          {
            role: option.messages.at(-1)?.role,
            content: option.messages.at(-1)?.content,
          },
          {
            role: "assistant",
            content: chunks.join(""),
          },
        ] as IMessageUnit[],
        usage: {
          promptTokens: chunk.usage.prompt_tokens,
          completionTokens: chunk.usage.completion_tokens,
          totalTokens: chunk.usage.total_tokens,
        },
      };
    }
  }

  return result;
}

export function createMessages(chatCompletionDatas: IChatCompletionData[]): Messages {
  const sorted = _.sortBy(chatCompletionDatas, ["orderNumber"]);
  return sorted.map(({ messages }) => messages).flat();
}

/**
 * 주저진 Prompt들을 순회하면서
 * @param model
 * @param prompts
 * @param messages
 * @returns
 */
export async function requestChatCompletionStreaming(
  model: GPTModel,
  prompts: IPrompt[],
  previousChatCompletionDatas: IChatCompletionData[]
): Promise<IChatCompletionData[]> {
  const messages = createMessages(previousChatCompletionDatas);
  const chatCompletionDatas: IChatCompletionData[] = [];

  let orderNumber = 1;
  for (const prompt of prompts) {
    const params = createChatCompletionStreamingParams(model, prompt, messages);
    try {
      const response = await chatCompletionStreaming(params);
      if (response) {
        chatCompletionDatas.push({ orderNumber, ...response });
        orderNumber += 1;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return chatCompletionDatas;
}
