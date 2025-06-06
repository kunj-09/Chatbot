import {  extractDetails } from "../services/geminiService.js";
import { saveAppointment } from "../services/airtableService.js";

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    // Step 1: Get GPT reply to keep conversation natural
    // const botReply = await askLLM(message);

    // Step 2: Extract structured user details
    const details = await extractDetails(message);

    // Step 3: Save details to Airtable if available
    // if (details.name && details.phone && details.appointment_date) {
    //   await saveAppointment(details);
    // }
    // Example: 
if (details.name && details.phone && details.email && details.appointment_date) {
    await saveAppointment(details);
  }
  

    return res.status(200).json({
    //   reply: botReply,
      extracted: details,
    });
  } catch (error) {
    console.error("Chat error:", error.message);
    return res.status(500).json({ error: "Something went wrong with chatbot." });
  }
};
