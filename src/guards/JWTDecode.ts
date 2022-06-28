import { Request, Response, NextFunction } from "express";
import jwt_decode from "jwt-decode";

export const JWTDecode = (clienteRota: string) => {
  return (request: Request, response: Response, next: NextFunction) => {
    if (request.headers.authorization != undefined) {
      try {
        const JWTDecode = jwt_decode(request.headers.authorization) as {
          criacao: number;
          expiracao: number;
          cliente: string;
        };

        if (JWTDecode.expiracao > Date.now()) {
          if (JWTDecode.cliente === clienteRota) {
            next();
          } else {
            response.status(401).send("Cliente não identificado");
            return;
          }
        } else {
          response.status(401).send("Token Expirado");
          return;
        }
      } catch (error) {
        response.status(401).send("Não identificado Token");
        return;
      }
    } else {
      response.status(401).send("Não identificado Token");
      return;
    }
  };
};
