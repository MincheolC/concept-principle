require("dotenv").config();

const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

// https://blog.hwahae.co.kr/all/tech/10960
(async () => {
  const pageCreationResponse = await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_PAGE_ID,
    },
    icon: {
      emoji: "🤖",
    },
    properties: {
      주제: {
        title: [
          {
            text: {
              content: "Test By Bot",
            },
          },
        ],
      },
      Status: {
        status: {
          name: "Not started",
        },
      },
      Customer: {
        select: {
          name: "봇",
          color: "red",
        },
      },
      "Send Date": {
        date: {
          start: "2024-05-17",
        },
      },
    },
    children: [
      {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [
            {
              text: {
                content: "User Input",
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "code",
        code: {
          rich_text: [
            {
              text: {
                content: 'console.log("Example Code")\nExample Code',
              },
            },
          ],
          language: "plain text",
        },
      },
      {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [
            {
              text: {
                content: "GPT4 Output",
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "code",
        code: {
          rich_text: [
            {
              text: {
                content: 'console.log("Example Code")\nExample Code',
              },
            },
          ],
          language: "javascript",
        },
      },
      {
        object: "block",
        type: "heading_1",
        heading_1: {
          rich_text: [
            {
              text: {
                content: "Human Touch Final",
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "code",
        code: {
          rich_text: [
            {
              text: {
                content: 'console.log("Example Code")\nExample Code',
              },
            },
          ],
          language: "java",
        },
      },
    ],
  });

  console.log(pageCreationResponse);
})();

/**
 * DB의 속성 스키마 정보 조회
 */
// const retrieveResponse = await notion.databases.retrieve({
//   database_id: process.env.NOTION_PAGE_ID,
// });

/**
 * DB에 포함된 page 목록 조회
 * - object
 * - results
 * - next_cursor
 * - has_more
 * - type
 * - page_or_database
 * - request_id
 */
// const queryResponse = await notion.databases.query({
//   database_id: process.env.NOTION_PAGE_ID,
//   filter: {
//     and: [
//       {
//         property: "Customer",
//         select: {
//           equals: "로운",
//         },
//       },
//       {
//         property: "Send Date",
//         date: {
//           after: "2024-05-01",
//         },
//       },
//     ],
//   },
// });
