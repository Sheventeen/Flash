import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config()

export const openAiResponse = async (input) => {

    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    const userResponse = await client.responses.create({
        model: "gpt-5-nano",
        input: `Return me a JSON of flashcards which consist of front and back which is built for ${input}`,
    });
    return userResponse;
}