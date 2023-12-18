import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  isDeleted: boolean;
  status: "in-progress" | "blocked";
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(plainTxtPass: string, hashedPass: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;

