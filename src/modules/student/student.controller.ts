import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err) {
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "Something went wrong!",
    //   data: err,
    // });
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stdId = req.params.stdId;
    const result = await StudentServices.getSingleStudentFromDB(stdId);
    res.status(200).json({
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stdId = req.params.stdId;
    const result = await StudentServices.deleteStudentFromDB(stdId);
    res.status(200).json({
      success: true,
      message: "Student is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err)
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
