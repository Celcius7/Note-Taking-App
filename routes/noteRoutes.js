// src/routes.js
const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

// Basic Note Operations
router.post("/", (req, res) => {
  const { title, content, tags } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Title and content are required" });

  const note = dataController.createNote(title, content, tags);
  res.status(201).json(note);
});

router.get("/", (req, res) => {
  res.json(dataController.getAllNotes());
});

router.get("/:id", (req, res) => {
  const note = dataController.getNoteById(req.params.id);
  if (!note) return res.status(404).json({ error: "Note not found" });

  res.json(note);
});

router.put("/:id", (req, res) => {
  const { title, content, tags } = req.body;
  const updatedNote = dataController.updateNoteById(req.params.id, {
    title,
    content,
    tags,
  });
  if (!updatedNote) return res.status(404).json({ error: "Note not found" });

  res.json(updatedNote);
});

router.delete("/:id", (req, res) => {
  dataController.deleteNoteById(req.params.id);
  res.status(204).end();
});

// Tag Management
router.put("/:id/tags", (req, res) => {
  const { tags } = req.body;
  if (!tags || !Array.isArray(tags))
    return res.status(400).json({ error: "Tags should be an array" });

  const note = dataController.addTagsToNoteById(req.params.id, tags);
  if (!note) return res.status(404).json({ error: "Note not found" });

  res.json(note);
});

router.delete("/:id/tags", (req, res) => {
  const { tags } = req.body;
  if (!tags || !Array.isArray(tags))
    return res.status(400).json({ error: "Tags should be an array" });

  const note = dataController.removeTagsFromNoteById(req.params.id, tags);
  if (!note) return res.status(404).json({ error: "Note not found" });

  res.json(note);
});

// Querying
router.get("/query", (req, res) => {
  const { tagQuery } = req.query;
  if (!tagQuery)
    return res.status(400).json({ error: "tagQuery parameter is required" });

  const notes = dataController.queryNotesByTags(tagQuery);
  res.json(notes);
});

module.exports = router;
