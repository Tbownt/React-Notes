import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journalSlice",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.messageSaved = "";
    },
    setSavig: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    deleteNoteById: (state, action) => {},
    savingNewNote: (state) => {
      state.isSaving = true;
    },
  },
});

export const {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSavig,
  updateNote,
} = journalSlice.actions;
