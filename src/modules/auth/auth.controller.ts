import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User is Logged in successfully!",
    success: true,
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const {...passwordData} = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password is updated successfully!",
    success: true,
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword
};
