import express from 'express';
import { createIssue } from '../controllers/IssueController.js';

const router = express.Router();

router.post('/createissue', createIssue);

export default router;