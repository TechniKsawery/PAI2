import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const authMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	const isAuth = Boolean(Math.round(Math.random()));

	if (isAuth) {
		next();
	} else {
		response.status(StatusCodes.UNAUTHORIZED).send();
	}
};
