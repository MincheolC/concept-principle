import { createChatCompletionStreamingParams, createMessages, IChatCompletionData, IPrompt, Messages } from "../gpt";

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

describe("createMessages", () => {
  test("normal case", () => {
    const chatCompletionDatas: IChatCompletionData[] = [
      {
        orderNumber: 2,
        messages: [
          {
            role: "system",
            content: "Repeat after me: Second prompt!",
          },
          {
            role: "assistant",
            content: "Second prompt!",
          },
        ],
        usage: {
          promptTokens: 14,
          completionTokens: 3,
          totalTokens: 17,
        },
      },
      {
        orderNumber: 1,
        messages: [
          {
            role: "system",
            content: "Repeat after me: First prompt!",
          },
          {
            role: "assistant",
            content: "First prompt!",
          },
        ],
        usage: {
          promptTokens: 14,
          completionTokens: 3,
          totalTokens: 17,
        },
      },
    ];

    const expected = [
      {
        role: "system",
        content: "Repeat after me: First prompt!",
      },
      {
        role: "assistant",
        content: "First prompt!",
      },
      {
        role: "system",
        content: "Repeat after me: Second prompt!",
      },
      {
        role: "assistant",
        content: "Second prompt!",
      },
    ];

    expect(createMessages(chatCompletionDatas)).toEqual(expected);
  });
});
