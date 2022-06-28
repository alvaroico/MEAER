import { Request, Response, NextFunction } from "express";
import { ValidadorSenha } from "../DTO/validadorSenha";
import { postPass } from "../interfaces/senhaPass";

const Validar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {

  if (!request.body?.senha || typeof request.body.senha !== "string") {
    response.status(400).send({
      mensagem: "Senha não informado.",
      pass: false,
    });
    return;
  }

  const { senha } = request.body as postPass;

  const minimoCaracter = parseInt(process.env.minimoCaracter || "9");

  const { statusCode, mensagem, pass } = new ValidadorSenha(
    senha,
    minimoCaracter
  ).getValidadorSenha;

  response.status(statusCode).send({
    mensagem: mensagem,
    pass: pass,
  });
  return;
};

export default {
  Validar: Validar,
};
