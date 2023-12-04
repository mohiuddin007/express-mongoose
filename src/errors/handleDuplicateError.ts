import { TErrorSource, TGenericErrorResponse } from "../interface/error";

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSource: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exists!`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid id",
    errorSource,
  };
};
