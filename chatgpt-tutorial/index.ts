import dotenv from "dotenv";
dotenv.config();

import { requestChatCompletionStreaming, IPromptSet, IChatCompletionData } from "./gpt";
import promptSet from "./prompt_sets/v1.0.0.json" assert { type: "json" };

async function runBrainstormingHelper(
  promptSet: IPromptSet,
  previousChatCompletionData?: IChatCompletionData
): Promise<IChatCompletionData[]> {
  const GROUP_NAME = "brainstormingHelper";
  const gptModel = promptSet.model;
  const brainstormingHelperPrompts = promptSet.prompts[GROUP_NAME];
  const chatCompletionDatas = await requestChatCompletionStreaming(
    gptModel,
    brainstormingHelperPrompts,
    previousChatCompletionData
  );

  return chatCompletionDatas.map((v) => ({
    group: GROUP_NAME,
    ...v,
  }));
}

async function runIntrosectionGenerator(
  promptSet: IPromptSet,
  previousChatCompletionData?: IChatCompletionData
): Promise<IChatCompletionData[]> {
  const GROUP_NAME = "introsectionGenerator";
  const gptModel = promptSet.model;
  const introsectionGeneratorPrompts = promptSet.prompts[GROUP_NAME];
  const chatCompletionDatas = await requestChatCompletionStreaming(
    gptModel,
    introsectionGeneratorPrompts,
    previousChatCompletionData
  );

  return chatCompletionDatas.map((v) => ({
    group: GROUP_NAME,
    ...v,
  }));
}

async function runDraftGenerator(
  promptSet: IPromptSet,
  previousChatCompletionData?: IChatCompletionData
): Promise<IChatCompletionData[]> {
  const GROUP_NAME = "draftGenerator";
  const gptModel = promptSet.model;
  const introsectionGeneratorPrompts = promptSet.prompts[GROUP_NAME];
  const chatCompletionDatas = await requestChatCompletionStreaming(
    gptModel,
    introsectionGeneratorPrompts,
    previousChatCompletionData
  );

  return chatCompletionDatas.map((v) => ({
    group: GROUP_NAME,
    ...v,
  }));
}

async function main() {
  const brainstormingHelperResult = await runBrainstormingHelper(promptSet as IPromptSet);

  let previousChatCompletionData = brainstormingHelperResult.at(-1);
  const introsectionGeneratorResult = await runIntrosectionGenerator(
    promptSet as IPromptSet,
    previousChatCompletionData
  );

  previousChatCompletionData = introsectionGeneratorResult.at(-1);
  const draftGeneratorResult = await runDraftGenerator(promptSet as IPromptSet, previousChatCompletionData);

  console.log(JSON.stringify(brainstormingHelperResult));
}

main();
