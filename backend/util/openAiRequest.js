import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
export const openAiResponse = async (input) => {
 
    const userResponse = await client.responses.create({
        model: "gpt-5-nano",
        input: `Return me a JSON (ONLY JSON and nothing else) of flashcards which consist of front and back which is built for ${input}`,
    });
    const rawData = userResponse.output[0]?.content[0]?.text.trim();
    try {
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Failed to parse OpenAI JSON:", rawText);
        throw new Error("Invalid JSON returned from OpenAI");
    }
}