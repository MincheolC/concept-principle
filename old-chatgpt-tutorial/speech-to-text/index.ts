import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    // file: fs.createReadStream("speech-to-text/sample.mp3"),
    file: fs.createReadStream("speech-to-text/sample2.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}
main();
