import {create} from "zustand"
import { axiosInstance } from "../lib/axios";

export const useNoteStore = create((set) => ({
    note: null,
    notes: [],
    loading: false,

    createNote: async (noteData) => {
        set({loading: true});

        try {
            await axiosInstance.post("/note/create", noteData);

            return true
        } catch (error) {
            console.error("Error creating note: ", error);
            return false;
        } finally {
            set({loading: false});
        }
    },

    getNote: async (noteId) => {
        set({loading: true});

        try {
            const res = await axiosInstance.get(`/note/${noteId}`);

            set({note: res.data.note});
        } catch (error) {
            console.error("Error fetching note: ", error);
        } finally {
            set({loading: false});
        }
    },

    getAllNotes: async () => {
        set({loading: true});

        try {
            const res = await axiosInstance.get(`/note`);

            set({notes: res.data.notes});
        } catch (error) {
            console.error("Error fetching notes: ", error);
        } finally {
            set({loading: false});
        }
    },

    editNote: async (noteId, editData) => {
        set({loading: true});

        try {
            await axiosInstance.patch(`/note/${noteId}/edit`, editData);

            return true
        } catch (error) {
            console.error("Error editing note: ", error);
            return false;
        } finally {
            set({loading: false});
        }
    },

    deleteNote: async (noteId) => {
        set({loading: true});

        try {
            const res = await axiosInstance.delete(`/note/${noteId}/delete`);

            set({note: null});
        } catch (error) {
            console.error("Error deleting note: ", error);
        } finally {
            set({loading: false});
        }
    }
}))