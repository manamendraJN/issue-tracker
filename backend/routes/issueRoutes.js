import express from 'express';
import { createIssue, getAllIssues, getIssueById } from '../controllers/IssueController.js';

const router = express.Router();

router.post('/createissue', createIssue);
router.get('/getallissues', getAllIssues);
router.get('/getissuebyid/:id', getIssueById);

export default router;