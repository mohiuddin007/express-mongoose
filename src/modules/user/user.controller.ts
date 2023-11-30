import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  //   const zodParsedData = studentSchemaZod.parse(studentData);
  const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully!",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
