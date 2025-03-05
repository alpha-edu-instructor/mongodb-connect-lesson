import express from "express";
import mongoose from "mongoose";
import { User } from "./models/User.js";

const app = express();
const PORT = 3000;
const connectionString = "mongodb://127.0.0.1:27017/lesson";

async function connectDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log("Подключено к базе данных!");
  } catch (error) {
    console.log("Error!");
  }
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, age } = req.body;

    const newUser = new User({ username, email, age });
    const result = await newUser.save();
    res
      .status(201)
      .json({ message: "Новый пользователь был успешно создан", user: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, age } = req.body;

    const result = await User.findByIdAndUpdate(
      id,
      { username, email, age },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
