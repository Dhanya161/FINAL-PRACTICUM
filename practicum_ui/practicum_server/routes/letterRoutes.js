import express from "express";
import { 
    approveLetter,
    createLetter, 
    deleteLetter, 
    getLetters, 
    studentLetters,
    getLetterById,
    rejectLetter, 
    updateLetterContent,
    getRejectedLetters,
} from "../controllers/letter.js";
import authorization from "../authorization.js";


const router = express.Router();
 
// Create a letter
router.post("/:studentId/create-letter", createLetter);

// Get all letters
router.get("/all",getLetters);

// Get all letters for a specific student
router.get("/:studentId/all", studentLetters);

// Get a specific letter by ID
router.get("/:id",getLetterById);

// Delete a letter
router.delete("/:id", authorization, deleteLetter);

// Approve a letter
router.patch("/approve/:id", approveLetter);

router.patch('/reject/:letterId', rejectLetter);

router.patch("/updateLetter/:id", updateLetterContent);

router.get('/rejected/:studentId', getRejectedLetters);


export default router;
