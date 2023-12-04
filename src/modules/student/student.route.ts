import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.zod.validation";

const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.get('/:stdId', StudentController.getSingleStudent);
router.patch('/:stdId',
validateRequest(StudentValidations.updateStudentValidationSchemaZod),
StudentController.updateStudent);
router.delete('/:stdId', StudentController.deleteStudent);

export const StudentRoutes = router;
