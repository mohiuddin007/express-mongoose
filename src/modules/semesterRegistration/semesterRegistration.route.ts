import { Router } from "express";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";

const router = Router();

router.get("/", SemesterRegistrationControllers.getAllSemesterRegistration);
router.post(
  "/create-semester-registration",
  SemesterRegistrationControllers.createSemesterRegistration
);
router.get(
  "/:id",
  SemesterRegistrationControllers.getSingleSemesterRegistration
);
router.patch(
  "/:id",
  SemesterRegistrationControllers.updateSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
