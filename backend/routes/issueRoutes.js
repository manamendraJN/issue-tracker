import express from 'express';
import { createIssue, getAllIssues } from '../controllers/IssueController.js';

const router = express.Router();

router.post('/createissue', createIssue);
router.get('/getallissues', getAllIssues);

export default router;