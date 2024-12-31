import { createChatCompletionStreamingParams, IChatCompletionData, IPrompt, Messages } from "../chat-completion";

describe("createChatCompletionStreamingParams", () => {
  test("normal case", () => {
    const model = "gpt-3.5-turbo";
    const prompt: IPrompt = {
      id: "S.P_001",
      temperature: 0.8,
      role: "system",
      content: "Answer in Korean",
    };
    const messages: Messages = [
      {
        role: "system",
        content: "It's a test",
      },
      {
        role: "assistant",
        content: "Ok~",
      },
    ];
    const expected = {
      model,
      temperature: 0.8,
      messages: [
        ...messages,
        {
          role: "system",
          content: "Answer in Korean",
        },
      ],
      stream: true,
      stream_options: {
        include_usage: true,
      },
    };

    expect(createChatCompletionStreamingParams(model, prompt, messages)).toEqual(expected);
  });
});
