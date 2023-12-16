import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OfferedCourseControllers } from "./offeredCourse.controller";
import { OfferedCourseValidations } from "./offeredCourse.validation";

const router = Router();

router.get("/", OfferedCourseControllers.getAllOfferedCourse);
router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);
router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);
router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

export const OfferedCourseRoutes = router;
