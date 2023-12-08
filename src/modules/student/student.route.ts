import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "./student.zod.validation";

const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch('/:id',
validateRequest(StudentValidations.updateStudentValidationSchemaZod),
StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
