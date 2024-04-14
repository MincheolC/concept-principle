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

  setInterval(() => {
    const message = {
      content: "News update",
      timestamp: new Date().toISOString(),
    };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log("Sent:", JSON.stringify(message));
  }, 1000);
};

main().catch(console.error);
