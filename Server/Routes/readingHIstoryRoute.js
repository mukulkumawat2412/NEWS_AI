import express from 'express';
import { addReadingHistory,getReadingHistory,clearReadingHistory } from '../controllers/ReadingHistoryController.js';
const router = express.Router();

router.get('/:id/reading-history', getReadingHistory);
router.post('/:id/reading-history', addReadingHistory);
router.delete('/:id/reading-history', clearReadingHistory);

export default router