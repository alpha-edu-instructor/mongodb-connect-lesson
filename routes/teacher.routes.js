import express from "express";
import TeacherController from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/", TeacherController.create);

export default router;
