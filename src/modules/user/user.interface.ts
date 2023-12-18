import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  isDeleted: boolean;
  status: "in-progress" | "blocked";
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(plainTxtPass: string, hashedPass: string): Promise<boolean>;
}
