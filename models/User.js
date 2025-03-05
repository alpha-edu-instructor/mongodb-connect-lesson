import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Поле 'username' является обязательным!"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Поле 'email' является обязательным!"],
    trim: true,
    unique: true
  },
  age: {
    type: Number,
    required: [true, "Поле 'age' является обязательным!"],
    min: 0
  }
});

export const User = mongoose.model("User", userSchema);
