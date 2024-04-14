import dotenv from "dotenv";
dotenv.config();

import { connect } from "amqplib";

const USER = process.env.RABBITMQ_DEFAULT_USER;
const PASSWORD = process.env.RABBITMQ_DEFAULT_PASS;

const main = async () => {
  const conn = await connect(`amqp://${USER}:${PASSWORD}@localhost`);
  const channel = await conn.createChannel();
  const queue = "news";

  await channel.assertQueue(queue, { durable: false });

  console.log("Waiting for messages in", queue);
  channel.consume(queue, (msg) => {
    if (msg) {
      const message = JSON.parse(msg.content.toString());
      console.log("Received:", message);

      /*
       * Acknowledgement
       * - 메세지 신뢰성 보장, 중복 처리 방지, 메세지 손실 방지를 위해 전달
       */
      channel.ack(msg);
    }
  });
};

main().catch(console.error);
