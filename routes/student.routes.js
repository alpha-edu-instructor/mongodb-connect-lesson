import express from "express";
import StudentController from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", StudentController.getAll);
router.post("/", StudentController.create);
router.post("/enroll", StudentController.enroll);

export default router;
