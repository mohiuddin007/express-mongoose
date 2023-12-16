import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { OfferedCorse } from "./offeredCourse.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  //if the semester registration is exists!
  const isSemesterRegistrationExists = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Semester registration not found!"
    );
  }

  //if the academicFaculty is exists!
  const isAcademicFacultyExists = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic faculty not found!");
  }

  //if the academicDepartment is exists!
  const isAcademicDepartmentExists = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic department not found!");
  }

  //if the academicDepartment is exists!
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found!");
  }

  //if the faculty is exists!
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found!");
  }

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
