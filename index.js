import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 8000;
const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);

app.use(express.json());

let db;

async function connectDatabase() {
  try {
    await client.connect();
    db = client.db("lesson");
    console.log("База данных успешно подключена!");
  } catch (error) {
    console.log("Не удалось подключиться к базе данных!");
  }
}

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/employees", async (req, res) => {
  try {
    const collection = db.collection("employees");
    const employees = await collection.find().toArray();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const collection = db.collection("employees");
    const employee = await collection.findOne({
      _id: new ObjectId(id)
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/employees", async (req, res) => {
  try {
    const { fullName, salary, department } = req.body;

    if (!fullName || !salary || !department) {
      return res.status(400).json({ error: "Заполните все поля" });
    }

    const collection = db.collection("employees");

    const employee = await collection.insertOne({
      fullName,
      salary,
      department
    });
    res.json({ message: "Новый работчик был успешно создан", employee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
