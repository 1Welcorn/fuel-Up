
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuizQuestions = async () => {
  const prompt = `Based on the following text: "Breakfast gives energy to your brain and body. Like a car needs gas, your body needs food. Food gives calories, this is energy. You need more or less calories depending on your body and activities. Extra calories become fat. A little fat is good, but too much is not healthy.", generate exactly 20 diverse and engaging multiple choice questions for a middle school student. The questions should vary in difficulty and cover: calories as energy, the car analogy, energy balance (intake vs activity), and health facts about fat. Return the results as a JSON array of objects.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctAnswer: { type: Type.INTEGER, description: 'Index of the correct answer' },
            explanation: { type: Type.STRING }
          },
          required: ['question', 'options', 'correctAnswer', 'explanation']
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const getAIFeedback = async (userInput: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The student says: "${userInput}". Briefly explain why this is related to the idea that breakfast is fuel for the body and brain. Keep it encouraging and under 3 sentences.`,
  });

  return response.text;
};
