const { OpenAI } = require("openai");
require("dotenv").config();

console.log("KEY:", process.env.OPENAI_API_KEY);
console.log("PROJECT:", process.env.OPENAI_PROJECT_ID);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
});

async function test() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello!" }],
      max_tokens: 10,
    });
    console.log(completion);
  } catch (err) {
    console.error("Test OpenAI error:", err);
    if (err.response) {
      console.error("Test OpenAI error response data:", err.response.data);
      console.error("Test OpenAI error response status:", err.response.status);
    }
  }
}

test();
