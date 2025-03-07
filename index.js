import express from "express";
import mongoose from "mongoose";
import teacherRoutes from "./routes/teacher.routes.js";
import studentRoutes from "./routes/student.routes.js";
import courseRoutes from "./routes/course.routes.js";
import "dotenv/config";

const app = express();
const PORT = 3000;
const connectionString = process.env.DB_URL;

async function connectDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log("Подключено к базе данных!");
  } catch (error) {
    console.log("Error!");
  }
}

app.use(express.json());
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);
app.use("/course", courseRoutes);

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
