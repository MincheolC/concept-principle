import dotenv from "dotenv";
dotenv.config();

import { requestChatCompletionStreaming, IPromptSet, IChatCompletionData } from "./gpt";
import promptSet from "./prompt_sets/v1.0.0.json" assert { type: "json" };

async function runBrainstormingHelper(promptSet: IPromptSet, previousChatCompletionDatas: IChatCompletionData[]) {
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

async function main() {
  const brainstormingHelperResult = await runBrainstormingHelper(promptSet as IPromptSet, []);
  console.log(JSON.stringify(brainstormingHelperResult));
}

main();
