import type { Request, Response, NextFunction } from "express";

export const logMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
    next()
};

/**
 * Stwórz middleware authMiddleware.
 * jego celem na byc zabezpieczenie naszej aplikacji w momencie, gdy uzytkownik
 * nie jest zalogowany
 * 
 * Flaga (boolean) czy uzytkownik jest zalogowany niech to bedzie random
 * Jesli uzytkownik jest zalogowany, niech wykona sie logika endpointa
 * Jesli uzytkownik nie jest zalogowany rzuc kodem 401
 */