import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";
import { Request, Response } from "express";

const createSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration created successfully",
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
        req.query
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registrations retrieved successfully",
      data: result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester Registration created successfully",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        req.params.id,
        req.body
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Semester Registration updated successfully",
      data: result,
    });
  }
);

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
};
