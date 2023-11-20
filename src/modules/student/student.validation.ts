import Joi from "joi";

  //creating a schema validation with joi
  const userNameSchema = Joi.object({
    firstName: Joi.string()
      .required()
      .trim()
      .max(20)
      .pattern(/^[A-Z][a-z]*$/, { name: "capitalize" })
      .message(
        "{#label} must start with an uppercase letter and the rest should be lowercase letters"
      ),
    middleName: Joi.string().trim().required(),
    lastName: Joi.string()
      .trim()
      .required()
      .pattern(/^[A-Za-z]+$/, { name: "alphabet" })
      .message("{#label} must only contain alphabetical characters"),
  });

  const guardianSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    motherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim().required(),
    fatherContactNo: Joi.string().trim().required(),
    motherContactNo: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim().required(),
  });

  const localGuardianSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
  });

  const studentValidationSchema = Joi.object({
    id: Joi.string().trim().required(),
    name: userNameSchema.required(),
    gender: Joi.string().trim().valid("male", "female").required(),
    dateOfBirth: Joi.string(),
    email: Joi.string().trim().email().required(),
    contactNo: Joi.string().trim().required(),
    emergencyContactNo: Joi.string().trim().required(),
    bloodGroup: Joi.string()
      .trim()
      .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
    presentAddress: Joi.string().trim().required(),
    permanentAddress: Joi.string().trim().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    isActive: Joi.string()
      .trim()
      .valid("active", "inActive")
      .default("active"),
    profileImg: Joi.string(),
  });

  export default studentValidationSchema;