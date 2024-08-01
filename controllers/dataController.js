// src/data.js
const { v4: uuidv4 } = require("uuid");

let notes = [];

function createNote(title, content, tags = []) {
  const newNote = { id: uuidv4(), title, content, tags };
  notes.push(newNote);
  return newNote;
}

function getNoteById(id) {
  return notes.find((note) => note.id === id);
}

function getAllNotes() {
  return notes;
}

function updateNoteById(id, updatedFields) {
  const note = getNoteById(id);
  if (note) {
    Object.assign(note, updatedFields);
  }
  return note;
}

function deleteNoteById(id) {
  notes = notes.filter((note) => note.id !== id);
}

function addTagsToNoteById(id, tags) {
  const note = getNoteById(id);
  if (note) {
    note.tags = [...new Set([...note.tags, ...tags])];
  }
  return note;
}

function removeTagsFromNoteById(id, tags) {
  const note = getNoteById(id);
  if (note) {
    note.tags = note.tags.filter((tag) => !tags.includes(tag));
  }
  return note;
}

function queryNotesByTags(tagQuery) {
  const tags = tagQuery.split(" ");
  let result = notes;

  if (tags.length > 0) {
    const conditions = {
      and: [],
      or: [],
      not: [],
    };

    tags.forEach((tag) => {
      if (tag.startsWith("+")) {
        conditions.and.push(tag.substring(1));
      } else if (tag.startsWith("-")) {
        conditions.not.push(tag.substring(1));
      } else {
        conditions.or.push(tag);
      }
    });

    result = result.filter((note) => {
      const hasTags = note.tags;
      const hasAllAndTags = conditions.and.every((t) => hasTags.includes(t));
      const hasAnyOrTags =
        conditions.or.length === 0 ||
        conditions.or.some((t) => hasTags.includes(t));
      const hasNoneNotTags = conditions.not.every((t) => !hasTags.includes(t));

      return hasAllAndTags && hasAnyOrTags && hasNoneNotTags;
    });
  }

  return result;
}

module.exports = {
  createNote,
  getNoteById,
  getAllNotes,
  updateNoteById,
  deleteNoteById,
  addTagsToNoteById,
  removeTagsFromNoteById,
  queryNotesByTags,
};
