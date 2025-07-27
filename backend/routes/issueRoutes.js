import express from 'express';
import { createIssue, getAllIssues, getIssueById, updateIssue, deleteIssue } from '../controllers/IssueController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createissue',authMiddleware, createIssue);
router.get('/getallissues',authMiddleware, getAllIssues);
router.get('/getissuebyid/:id',authMiddleware, getIssueById);
router.put('/updateissue/:id',authMiddleware, updateIssue);
router.delete('/deleteissue/:id',authMiddleware, deleteIssue);

export default router;