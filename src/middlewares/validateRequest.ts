import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      // console.log(req.body, "end");
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
