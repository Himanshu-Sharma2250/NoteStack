import { Note } from "../models/note.model.js";
import { noteSchema } from "../validators/note.validator.js"

// create note
export const createNote = async (req, res) => {
    const {data, error} = noteSchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            message: "Error occured during parsing"
        })
    }

    const {title, description, priority, status} = data;
    const userId = req.user.id;

    try {
        const note = await Note.create({
            userId: userId,
            title,
            description,
            status,
            priority
        })

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not created"
            })
        }

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            note
        })
    } catch (error) {
        console.error("Error creating note: ", error);
        res.status(500).json({
            success: false,
            message: "Error creating note"
        })
    }
}

// get note
export const getNote = async (req, res) => {
    const {noteId} = req.params;

    if (!noteId) {
        return res.status(400).json({
            success: false,
            message: "Note is not specified"
        })
    }

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Note fetched",
            note
        })
    } catch (error) {
        console.error("Error fetching note: ", error);
        res.status(500).json({
            success: false,
            message: "Error fetching note"
        })
    }
}

// get all notes
export const getAllNotes = async (req, res) => {
    try {
        const userId = req.user._id;

        const notes = await Note.find(userId);

        if (!notes) {
            return res.status(404).json({
                success: false,
                message: "Notes not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Notes fetched",
            notes
        })
    } catch (error) {
        console.error("Error fetching notes: ", error);
        res.status(500).json({
            success: false,
            message: "Error fetching notes"
        })
    }
}

// edit note
export const editNote = async (req, res) => {
    const {noteId} = req.params;
    const {data, error} = noteSchema.safeParse(req.body);

    if (error) {
        return res.status(400).json({
            message: "Error occured during parsing"
        })
    }

    const {title, description, priority, status} = data;

    if (!noteId) {
        return res.status(400).json({
            success: false,
            message: "Note is not specified"
        })
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(noteId,
            {
                title,
                description,
                priority,
                status
            },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Note updated",
            note: updatedNote
        })
    } catch (error) {
        console.error("Error editing note: ", error);
        res.status(500).json({
            success: false,
            message: "Error editing note"
        })
    }
}

// delete note
export const deleteNote = async (req, res) => {
    const {noteId} = req.params;

    if (!noteId) {
        return res.status(400).json({
            success: false,
            message: "Note is not specified"
        })
    }

    try {
        const note = await Note.findByIdAndDelete(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Note deleted"
        })
    } catch (error) {
        console.error("Error deleting note: ", error);
        res.status(500).json({
            success: false,
            message: "Error deleting note"
        })
    }
}