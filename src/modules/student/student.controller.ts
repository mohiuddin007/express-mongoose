import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students are retrieved successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { student } = req.body;
    const result = await StudentServices.updateStudentIntoDB(id, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is update successfully!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
});

const deleteStudent = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
