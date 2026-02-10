import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, editNote, getAllNotes, getNote } from "../controllers/note.controller.js";

const noteRouter = express.Router();

noteRouter.post("/create", verifyJWT, createNote);
noteRouter.get("/:noteId", verifyJWT, getNote);
noteRouter.get("/", verifyJWT, getAllNotes);
noteRouter.patch("/:noteId/edit", verifyJWT, editNote);
noteRouter.delete("/:noteId/delete", verifyJWT, deleteNote);

export default noteRouter;