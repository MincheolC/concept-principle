import dotenv from "dotenv";
dotenv.config();

import { requestChatCompletionStreaming, IPromptSet, IChatCompletionData } from "./gpt";
import promptSet from "./prompt_sets/v1.0.0.json" assert { type: "json" };

async function runBrainstormingHelper(
  promptSet: IPromptSet,
  previousChatCompletionDatas: IChatCompletionData[]
): Promise<IChatCompletionData[]> {
  const GROUP_NAME = "brainstormingHelper";
  const gptModel = promptSet.model;
  const brainstormingHelperPrompts = promptSet.prompts[GROUP_NAME];
  const chatCompletionDatas = await requestChatCompletionStreaming(
    gptModel,
    brainstormingHelperPrompts,
    previousChatCompletionDatas
  );

  return chatCompletionDatas.map((v) => ({
    group: GROUP_NAME,
    ...v,
  }));
}

async function runIntrosectionGenerator(
  promptSet: IPromptSet,
  previousChatCompletionDatas: IChatCompletionData[]
): Promise<IChatCompletionData[]> {
  const GROUP_NAME = "introsectionGenerator";
  const gptModel = promptSet.model;
  const introsectionGeneratorPrompts = promptSet.prompts[GROUP_NAME];
  const chatCompletionDatas = await requestChatCompletionStreaming(
    gptModel,
    introsectionGeneratorPrompts,
    previousChatCompletionDatas
  );

  return chatCompletionDatas.map((v) => ({
    group: GROUP_NAME,
    ...v,
  }));
}

async function runDraftGenerator(
  promptSet: IPromptSet,
  previousChatCompletionDatas: IChatCompletionData[]
): Promise<IChatCompletionData[]> {
  const GROUP_NAME = "draftGenerator";
  const gptModel = promptSet.model;
  const introsectionGeneratorPrompts = promptSet.prompts[GROUP_NAME];
  const chatCompletionDatas = await requestChatCompletionStreaming(
    gptModel,
    introsectionGeneratorPrompts,
    previousChatCompletionDatas
  );

  return chatCompletionDatas.map((v) => ({
    group: GROUP_NAME,
    ...v,
  }));
}

async function main() {
  const brainstormingHelperResult = await runBrainstormingHelper(promptSet as IPromptSet, []);
  const introsectionGeneratorResult = await runIntrosectionGenerator(
    promptSet as IPromptSet,
    brainstormingHelperResult
  );
  const draftGeneratorResult = await runDraftGenerator(promptSet as IPromptSet, [
    ...brainstormingHelperResult,
    ...introsectionGeneratorResult,
  ]);

  console.log(JSON.stringify(brainstormingHelperResult));
}

main();
