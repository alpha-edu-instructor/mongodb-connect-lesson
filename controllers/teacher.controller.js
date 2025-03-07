import { Teacher } from "../models/Teacher.js";

class TeacherController {
  async create(req, res) {
    try {
      const { fullName, title, year } = req.body;
      const teacher = await new Teacher({
        fullName,
        certificate: { title, year }
      }).save();
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new TeacherController();
