import { Request, Response, NextFunction } from "express";

const Validar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.body?.senha
    ? request.body.senha
    : () => {
        response.status(400).send("Senha não informado.");
        return;
      };

  response.status(400).send("Senha inválido.");
  return;
};

export default {
  Validar: Validar,
};
