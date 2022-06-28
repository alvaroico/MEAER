import { Request, Response, NextFunction } from "express";
import { postPass } from "../interfaces/senhaPass";
import { caracterLen } from "../tools/caracteres";
import { digitosExiste } from "../tools/digito";

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

  const { senha } = request.body as unknown as postPass;

  // Verifica se existe ao menos 1 dígito.
  if (digitosExiste(senha) === false) {
    response
      .status(401)
      .send(
        `Ao menos 1 dígito.`
      );
    return;
  }

  // Minimo caracteres senha carregado pelo Env minimo 9
  if (
    caracterLen(senha, parseInt(process.env.minimoCaracter || "9")) === false
  ) {
    response
      .status(401)
      .send(
        `Senha não atendo o minimo carácter ${process.env.minimoCaracter}.`
      );
    return;
  }

  response.status(200).send(senha);
  return;
};

export default {
  Validar: Validar,
};
