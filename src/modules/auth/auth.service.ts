import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TLoginUser, TResetPassword } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

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

  //create access token, refresh token and send to the user
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret_key as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword
) => {
  //checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData?.userId);
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
  if (!(await User.isPasswordMatched(payload.oldPassword, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Old Password is incorrect!");
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config?.bcrypt_salt_rounds as string)
  );

  await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

const refreshToken = async (token: string) => {
  //check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;
  const { userId, iat } = decoded;

  //checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);
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

  if (
    user.passwordChangedAt &&
    User.isJwtIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  //create access token, refresh token and send to the user
  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret_key as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);
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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  //create access token, refresh token and send to the user
  const resetToken = createToken(
    jwtPayload,
    config.jwt_secret_key as string,
    "10m"
  );

  const resetUrlLink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;

  sendEmail(user.email, resetUrlLink);
};

const resetPassword = async (payload: TResetPassword, token: string) => {
  const user = await User.isUserExistsByCustomId(payload.id);
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

  const decoded = jwt.verify(
    token,
    config.jwt_secret_key as string
  ) as JwtPayload;
  const { userId, role, iat } = decoded;

  if (payload?.id != userId) {
    throw new AppError(httpStatus.FORBIDDEN, "You are forbidden!");
  }

   //hash new password
   const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config?.bcrypt_salt_rounds as string)
  );

  await User.findOneAndUpdate(
    {
      id: userId,
      role: role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    }
  );

};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
