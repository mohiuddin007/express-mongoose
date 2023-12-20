import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.zod.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentController.getSingleStudent
);
router.patch(
  "/:id",
  validateRequest(StudentValidations.updateStudentValidationSchemaZod),
  StudentController.updateStudent
);
router.delete("/:id", StudentController.deleteStudent);

export const StudentRoutes = router;
