import { Router } from "express";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = Router();

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);
router.post(
  "/create-academic-department",
  AcademicDepartmentControllers.createAcademicDepartment
);
router.get(
  "/:departmentId",
  AcademicDepartmentControllers.getSingleAcademicDepartment
);
router.patch(
  "/:departmentId",
  AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
