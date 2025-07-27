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

// Get All Issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Issue by ID
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Issue
export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Issue
export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) return res.status(404).json({ error: 'Issue not found' });
    res.json({ message: 'Issue deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};