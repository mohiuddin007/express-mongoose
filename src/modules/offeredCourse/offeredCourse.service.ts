import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { OfferedCorse } from "./offeredCourse.model";
import { TOfferedCourse } from "./offeredCourse.interface";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCorse.create(payload);
  return result;
};

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    OfferedCorse.find().populate({
      path: "AcademicSemester",
      options: { strictPopulate: false },
    }),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCorse.findById(id);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {
  const result = await OfferedCorse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
