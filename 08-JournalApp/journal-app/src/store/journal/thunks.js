import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSavig,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    dispatch(savingNewNote());
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = (uid = "") => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid del usuario no existe");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNotes = () => {
  return async (dispatch, getState) => {
    dispatch(setSavig());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    //eliminamos el id de la nota que se va a enviar a fireStore porque en el caso contrario
    //de enviarse tal cual como viene, firebase creara el mismo id y crearia conflictos
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    //lo que hace el merge es que si estoy mandando campos que no estan en fireBase al enviarse el update
    //los campos que estaban en fireBase se mantienen sin conflictos
    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(note));
  };
};
