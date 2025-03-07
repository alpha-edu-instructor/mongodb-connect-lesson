import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
);

const teacherSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    certificate: {
      type: certificateSchema,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
