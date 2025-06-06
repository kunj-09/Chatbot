import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  transporter.verify(function (error, success) {
    if (error) {
      console.error("Transporter Error:", error);
    } else {
      console.log("📬 Email server is ready to send messages");
    }
  });
  

  export const sendReminderEmail = async (to, name, appointmentDate, type = "initial") => {
    if (!to || !to.includes("@")) {
      console.log(`⚠️ No valid email for ${name}`);
      return;
    }
  
    const subject = type === "initial" 
      ? "📅 Your Appointment Confirmation" 
      : "⏰ Appointment Reminder (Today)";
  
    const text = type === "initial"
      ? `Hi ${name},\n\nThis confirms your appointment scheduled for ${appointmentDate}.`
      : `Hi ${name},\n\nThis is a reminder that you have an appointment today (${appointmentDate}).`;
  
    const mailOptions = {
      from: `"Appointment System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      // You can add HTML version too
      html: `<p>${text.replace(/\n/g, "<br>")}</p>`
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`✅ Email (${type}) sent to ${to}, messageId: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error("❌ Email send error:", error.message);
      return false;
    }
  };