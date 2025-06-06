import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// export const extractDetails = async (message) => {
//   const prompt = `
// You are a helpful assistant that extracts only the user's details from a message.

// Message: ${message}

// Return ONLY a raw JSON object in the following format:
// {
//   "name": "string or null",
//   "phone": "string or null",
//   "appointment_date": "YYYY-MM-DD or null"
// }

// Do not include any explanation or additional text — just valid JSON.
// `;

//   try {
//     const chatModel = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });

//     const result = await chatModel.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: prompt }],
//         },
//       ],
//     });

//     const response = await result.response;
//     const rawText = response.text().trim();

//     const match = rawText.match(/\{[\s\S]*\}/);
//     if (!match) throw new Error("No valid JSON found");

//     const json = JSON.parse(match[0]);

//     return json;
//   } catch (error) {
//     console.error("Gemini Extraction Error:", error.message);
//     return { name: null, phone: null, appointment_date: null };
//   }
// };



export const extractDetails = async (message) => {
  const prompt = `
You are a helpful assistant that extracts only the user's details from a message.

Message: ${message}

Return ONLY a raw JSON object in the following format:
{
  "name": "string or null",
  "phone": "string or null",
  "email": "string or null",
  "appointment_date": "YYYY-MM-DD or null"
}

Do not include any explanation or additional text — just valid JSON.
`;

  try {
    const chatModel = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await chatModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;
    const rawText = response.text().trim();

    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No valid JSON found");

    const json = JSON.parse(match[0]);

    return json;
  } catch (error) {
    console.error("Gemini Extraction Error:", error.message);
    return { name: null, phone: null, email: null, appointment_date: null };
  }
};
