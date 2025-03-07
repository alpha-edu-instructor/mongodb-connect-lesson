import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";

class StudentController {
  async create(req, res) {
    try {
      const { fullName, age } = req.body;
      const student = await new Student({ fullName, age }).save();
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async enroll(req, res) {
    try {
      const { courseId, studentId } = req.body;

      // Добавить id студента в Course.students
      const courseUpdate = await Course.findByIdAndUpdate(courseId, {
        $push: { students: studentId }
      });
      // Добавить id курса в Student.courses
      const studentUpdate = await Student.findByIdAndUpdate(studentId, {
        $push: { courses: courseId }
      });

      if (!courseUpdate || !studentUpdate) {
        return res
          .status(404)
          .json({ message: "Студент или курс не был найден!" });
      }

      res.json({
        message: `Студент с id - ${studentId} успешно зарегистрован на курс (${courseId})`
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const students = await Student.find().populate(
        "courses",
        "title description"
      );
      if (!students.length) {
        throw new Error("Студенты не найдены!");
      }

      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new StudentController();
