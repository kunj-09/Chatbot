// import Airtable from "airtable";
// import dotenv from "dotenv";
// import { sendReminderEmail } from "./emailService.js";
// import moment from "moment";

// dotenv.config();

// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

// export const reminderScheduler = async () => {
//   const today = moment().format("YYYY-MM-DD");

//   try {
//     base("Appointments")
//       .select({
//         filterByFormula: `{Appointment Date} = "${today}"`,
//       })
//       .eachPage(async (records, fetchNextPage) => {
//         for (const record of records) {
//           const name = record.get("Name");
//           const emailOrPhone = record.get("Phone"); // Assuming it's email for reminder
//           const date = record.get("Appointment Date");

//           if (emailOrPhone && emailOrPhone.includes("@")) {
//             await sendReminderEmail(emailOrPhone, name, date);
//             console.log(`✅ Reminder email sent to ${name} at ${emailOrPhone} for appointment on ${date}`);
//           } else {
//             console.log(`⚠️ No valid email for ${name}`);
//           }
//         }

//         fetchNextPage();
//       });
//   } catch (error) {
//     console.error("Reminder job error:", error);
//   }
// };


import Airtable from "airtable";
import dotenv from "dotenv";
import { sendReminderEmail } from "./emailService.js";
import moment from "moment";

dotenv.config();

console.log("AIRTABLE_API_KEY (PAT):", process.env.AIRTABLE_API_KEY);
console.log("AIRTABLE_BASE_ID:", process.env.AIRTABLE_BASE_ID);

const airtable = new Airtable({ accessToken: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID);
// Store already notified records in memory (temporary)
const notifiedRecords = new Set();

const reminderScheduler = async () => {
    const today = moment().format("MM-DD-YYYY");
  
    try {
      const records = await base("Appointments").select().all();
  
      for (const record of records) {
        const id = record.id;
        const name = record.get("Name") || "Unknown";
        const email = record.get("Email"); // <-- use Email field here
        const date = record.get("Appointment Date");
  
        if (email && email.includes("@")) {
          if (date === today) {
            await sendReminderEmail(email, name, date, "reminder");
            console.log(`📅 Same-day reminder sent to ${name}`);
          }
  
          if (!notifiedRecords.has(id)) {
            await sendReminderEmail(email, name, date, "initial");
            notifiedRecords.add(id);
            console.log(`⚡ Immediate email sent to ${name}`);
          }
        } else {
          console.log(`⚠️ No valid email for ${name}`);
        }
      }
    } catch (error) {
      console.error("❌ Reminder job error:", error.message);
    }
  };
  
  


export default reminderScheduler;


  
 