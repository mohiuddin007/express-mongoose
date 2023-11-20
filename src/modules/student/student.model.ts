import { Schema, model } from "mongoose";
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "Max allowed length 25 characters"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format'
    }
  },
  middleName: {
    type: String,
    trim: true,
    required: [true, "Middle Name is required"],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid"
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father Name is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother Name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    rrequired: [true, "Father Contact No is required"],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother Contact No is required"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother Occupation is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Cccupation is required"],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Contact No is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Address is required"],
  },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    trim: true,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ["male", "female"],
      message: "The gender field can be one of the following: 'male', 'female'",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: String,
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type'
    }
  },
  contactNo: {
    trim: true,
    type: String,
    required: [true, "Contact No is required"],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, "Emergency Contact No is required"],
  },
  bloodGroup: {
    type: String,
    trim: true,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "{VALUE} is not valid!",
    },
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, "Present Address is required"],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, "Permanent Address is required"],
  },
  guardian: {
    type: guardianSchema,
    trim: true,
    required: [true, "Guardian is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    trim: true,
    required: [true, "Local Guardian is required"],
  },
  isActive: {
    type: String,
    enum: ["active", "inActive"],
    trim: true,
    default: "active",
  },
  profileImg: String,
});

export const StudentModel = model<TStudent>("Student", studentSchema);
