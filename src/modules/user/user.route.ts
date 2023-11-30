import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createStudentValidationSchemaZod } from "../student/student.zod.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchemaZod),
  UserControllers.createStudent
);

export const UserRoutes = router;
