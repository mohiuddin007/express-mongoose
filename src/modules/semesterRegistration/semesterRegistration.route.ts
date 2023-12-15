import { Router } from "express";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";

const router = Router();

router.get("/", SemesterRegistrationControllers.getAllSemesterRegistration);
router.post(
  "/create-semester-registration",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.createSemesterRegistration
);
router.get(
  "/:id",
  SemesterRegistrationControllers.getSingleSemesterRegistration
);
router.patch(
  "/:id",
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationControllers.updateSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
