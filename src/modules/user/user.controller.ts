import { UserService } from "./user.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const createStudent = catchAsync(async (req, res, next) => {
  console.log("file",req.file);
  console.log('data', req.body);
  // const { password, student: studentData } = req.body;
  // const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully!",
    data: null,
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is created successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  const { userId, role } = req?.user;
  const result = await UserService.getMeFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const result = await UserService.statusChangeIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status is changed successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
};
