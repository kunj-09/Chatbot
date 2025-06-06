import express from 'express';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
// import reminderScheduler from './schedulers/reminderScheduler.js';
import cron from "node-cron";
import reminderScheduler  from "./services/reminderService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Start Reminder Scheduler
reminderScheduler();
// reminderService();

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
    res.send("hello")
  });
  // Runs every day at 9 AM
cron.schedule("*/2 * * * *", async () => {
    console.log("Running daily reminder check...");
    await reminderScheduler();
  });