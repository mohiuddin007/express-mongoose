import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import Joi from "joi";
import studentValidationSchema from "./student.validation";
import { studentSchemaZod } from "./student.zod.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zod
    const zodParsedData = studentSchemaZod.parse(studentData);

    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong",
    //     error,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: "Student is created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      data: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const stdId = req.params.stdId;
    const result = await StudentServices.getSingleStudentFromDB(stdId);
    res.status(200).json({
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      data: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const stdId = req.params.stdId;
    const result = await StudentServices.deleteStudentFromDB(stdId);
    res.status(200).json({
      success: true,
      message: "Student is deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      data: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
