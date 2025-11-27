import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
  // In a real app, you might have more robust error handling or a fallback.
  // For this context, we'll log an error if the key is missing.
  console.error("API_KEY environment variable not set.");
}

export const ai = new GoogleGenAI({ apiKey });
