import express from "express";
import CourseController from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", CourseController.getAll);
router.post("/", CourseController.create);

export default router;
