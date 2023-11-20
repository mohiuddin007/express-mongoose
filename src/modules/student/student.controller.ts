import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import Joi from "joi";

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation with joi
    const JoiValidationSchema = Joi.object({
        id: Joi.string(),
        name: {
            firstName: Joi.string().max(20).required(),
            middleName: Joi.string().max(20),
            lastName: Joi.string().max(20)
        },
        gender: Joi.string().required().valid(["male", "female"])
    })


    const student = req.body.student;

    //will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(student);
    //send response
    res.status(200).json({
      success: true,
      message: "Student is created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
