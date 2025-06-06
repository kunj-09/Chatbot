import express from 'express';
import { handleChat } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', handleChat); // POST /api/chat

export default router;
