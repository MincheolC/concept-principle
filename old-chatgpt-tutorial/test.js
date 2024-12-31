function trimWithLinkbreak(str) {
  return str
    .split("\n")
    .map((line) => line.trim())
    .join(" ")
    .replace(/\\n/g, "\n");
}

let b = "b";
let a = `Writing Instruction:\\n  
  1. Understand who the customer is: age, job, location, etc.  
  Do not start writing the draft yet. 
  Extract relevant information from the customer's brand/business profile:\\n${b}`;

console.log(trimWithLinkbreak(a));

const c = `I provide personal branding content consulting service.
You are a writing assistant for personal branding content.
For each customer, I will provide you with necessary information and instruction step-by-step.
Please use Korean for most of the cases throughout our conversation and for content generation.`;

console.log(trimWithLinkbreak(c));

const samplesStr = `\n<sample 1>\nsamples\n</sample 1>`;
const d = `Writing Instruction:\\n 
2. Go through the customer's past content samples to understand and describe his or her 
writing style, habit, vocabulary, nuance, and use of emojis. Do not start writing the draft yet. 
Carefully analyze how the customer finishes each sentence with -다, -요, -죠, etc. 
Also, carefully take a look at how the customer addresses oneself. Do not start writing the draft yet. 
Extract relevant information from the customer's past writing samples:\\n`;
console.log(trimWithLinkbreak(d) + samplesStr);
