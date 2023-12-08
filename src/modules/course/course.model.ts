import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, "Prefix is required"],
  },
  code: {
    type: Number,
    trim: true,
    required: [true, "code is required"],
  },
  credits: {
    type: Number,
    trim: true,
    required: [true, "credits are required"],
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>("Course", courseSchema);
