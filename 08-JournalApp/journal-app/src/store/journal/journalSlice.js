import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journalSlice",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    isModalOpen: false,
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    onToggleModalState: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
      state.messageSaved = "";
    },
    setSavig: (state) => {
      state.isSaving = false;
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

      state.messageSaved = `${action.payload.title} actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, { payload = [] }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      (state.notes = []), (state.active = null);
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.messageSaved = "";
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSavig,
  updateNote,
  onToggleModalState,
} = journalSlice.actions;
