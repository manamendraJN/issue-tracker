import express from 'express';
import { createIssue, getAllIssues, getIssueById, updateIssue } from '../controllers/IssueController.js';

const router = express.Router();

router.post('/createissue', createIssue);
router.get('/getallissues', getAllIssues);
router.get('/getissuebyid/:id', getIssueById);
router.put('/updateissue/:id', updateIssue);

export default router;