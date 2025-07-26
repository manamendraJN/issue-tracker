import Issue from '../models/Issue.js';

// Create Issue
export const createIssue = async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};