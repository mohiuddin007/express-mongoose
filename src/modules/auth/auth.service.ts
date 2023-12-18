import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  //checking if the user is already deleted
  const isUserDeleted = user.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
  }

  //checking if the user is already deleted
  const userStatus = user.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password incorrect!");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  //create token and send to the user
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret_key as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange
  }
};

export const AuthServices = {
  loginUser,
};
