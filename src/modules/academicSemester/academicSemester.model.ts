import { Schema, model } from "mongoose";
import {
  TAcademicSemester,
} from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, monthsArr } from "./academicSemester.constant";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";


const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: monthsArr,
    required: true,
  },
  endMonth: {
    type: String,
    enum: monthsArr,
    required: true,
  },
}, {
  timestamps: true,
});

academicSemesterSchema.pre('save', async function(next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year
  })
  if(isSemesterExists) {
    throw new AppError(httpStatus.FORBIDDEN, "Semester is already exist!");
  } 
  next();
})

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
