// import Airtable from "airtable";
// import dotenv from "dotenv";

// dotenv.config();

// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
// console.log(base)

// export const saveAppointment = async ({ name, phone, appointment_date }) => {
//   try {
//     const createdRecord = await base("Appointments").create([
//       {
//         fields: {
//           Name: name,
//           Phone: phone,
//           "Appointment Date": appointment_date,
//         },
//       },
//     ]);

//     return createdRecord[0];
//   } catch (error) {
//     console.error("Airtable save error:", error);
//     throw new Error("Failed to save appointment");
//   }
// };



import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config();

// console.log("AIRTABLE_API_KEY (PAT):", process.env.AIRTABLE_API_KEY);
// console.log("AIRTABLE_BASE_ID:", process.env.AIRTABLE_BASE_ID);

const airtable = new Airtable({ accessToken: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID);

export const saveAppointment = async ({ name, phone, email, appointment_date }) => {
  try {
    const createdRecord = await base("Appointments").create([
      {
        fields: {
          Name: name,
          Phone: phone,
          Email: email,
          "Appointment Date": appointment_date,
        },
      },
    ]);

    return createdRecord[0];
    
  } 
  catch (error) {
    console.error("Airtable save error:", error);
    throw new Error("Failed to save appointment");
  }
};
