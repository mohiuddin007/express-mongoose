import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  monthsArr,
} from "./academicSemester.constant";

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...monthsArr] as [string, ...string[]]),
    endMonth: z.enum([...monthsArr] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...monthsArr] as [string, ...string[]]).optional(),
    endMonth: z.enum([...monthsArr] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema
};
