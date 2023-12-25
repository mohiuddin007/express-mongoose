import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";
import { enrolledCourseControllers } from "./enrolledCourse.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  ),
  enrolledCourseControllers.createEnrolledCourse
);

router.patch(
  "/update-enrolled-course",
  auth(USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema
  ),
  enrolledCourseControllers.updateEnrolledCourseMarks
);

export const enrolledCourseRoutes = router;
