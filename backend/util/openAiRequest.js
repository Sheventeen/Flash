import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
export const openAiResponse = async (input) => {
 
    const userResponse = await client.responses.create({
        model: "gpt-5-nano",
        input: `Return me a JSON (ONLY JSON and no additional words or sentences since I will be doing JSON.parse to it) of flashcards which consist of front and back which is built for ${input}`,
    });
    const rawData = userResponse.output_text?.trim();
    try {
        return rawData
    } catch (error) {
        console.error("Failed to parse OpenAI JSON:", rawText);
        throw new Error("Invalid JSON returned from OpenAI");
    }
}