import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).refine(value => /^[A-Z][a-z]*$/.test(value), {
    message: "First Name must start with an uppercase letter and the rest should be lowercase letters",
  }),
  middleName: z.string().min(1),
  lastName: z.string().min(1).refine(value => /^[A-Za-z]+$/.test(value), {
    message: "Last Name must only contain alphabetical characters",
  }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  motherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherContactNo: z.string().min(1),
  motherOccupation: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const createStudentValidationSchemaZod = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string(),
      email: z.string().min(1).email(),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
    })
  })
});

export { createStudentValidationSchemaZod };
