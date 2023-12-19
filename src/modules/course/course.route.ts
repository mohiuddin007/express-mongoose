import { Router } from "express";
import { CourseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.get("/", CourseControllers.getAllCourse);

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  CourseControllers.getSingleCourse
);

router.post(
  "/create-course",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.patch(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

router.delete("/:id", auth(USER_ROLE.admin), CourseControllers.deleteCourse);

export const CourseRoutes = router;
