import express from "express";
import { getStudentData } from '../controllers/student.js';

import { 
    deletion,
    login, 
    register
} from "../controllers/student.js";
import authorization from "../authorization.js"

const router = express.Router();

router.post("/create-account", register);
router.post("/login", login);
router.delete("/delete-account/:id", authorization, deletion)
router.get('/studentData', getStudentData); 


export default router;