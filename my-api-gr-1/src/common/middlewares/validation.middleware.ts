import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const validationMiddleware = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = plainToInstance(DtoClass, req.body);

      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).json(errors);
      }
      next()
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  };
};
