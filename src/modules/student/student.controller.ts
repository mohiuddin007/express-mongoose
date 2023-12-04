import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res, next) => {
    const result = await StudentServices.getAllStudentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    })
});

const getSingleStudent = catchAsync(async (req, res, next) => {
    const stdId = req.params.stdId;
    const result = await StudentServices.getSingleStudentFromDB(stdId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    })
});

const updateStudent = catchAsync(async (req, res, next) => {
  try {
    const stdId = req.params.stdId;
    const {student} = req.body;
    const result = await StudentServices.updateStudentIntoDB(stdId, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is update successfully!",
      data: result,
    })
  } catch (err: any) {
    next(err)
  }
});

const deleteStudent = catchAsync(async (req, res, next) => {
  try {
    const stdId = req.params.stdId;
    const result = await StudentServices.deleteStudentFromDB(stdId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted successfully!",
      data: result,
    })
  } catch (err: any) {
    next(err)
  }
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
};
