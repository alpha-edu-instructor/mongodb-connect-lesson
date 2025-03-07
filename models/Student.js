import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Course",
    default: []
  }
});

export const Student = mongoose.model("Student", studentSchema);
