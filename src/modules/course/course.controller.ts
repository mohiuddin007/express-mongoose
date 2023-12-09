import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is created successfully",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res, next) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const course = req.body;
  const result = await CourseServices.updateCourseIntoDB(id, course);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is updated successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is deleted successfully",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const {faculties} = req.body;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties assigned successfully",
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const {faculties} = req.body;
  const result = await CourseServices.removeFacultiesFromCourseIntoDB(courseId, faculties);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculties removed successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
