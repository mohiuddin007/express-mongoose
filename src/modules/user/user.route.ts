import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { StudentValidations } from "../student/student.zod.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admin/admin.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserValidations } from "./user.zod.validation";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(StudentValidations.createStudentValidationSchemaZod),
  UserControllers.createStudent
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserControllers.getMe
);

router.post(
  "/change-status/:id",
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.changeStatusValidationSchema),
  UserControllers.changeStatus
);

export const UserRoutes = router;
