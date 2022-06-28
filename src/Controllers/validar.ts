import { Request, Response, NextFunction } from "express";
import { postPass } from "../interfaces/senhaPass";
import { caracterLen } from "../tools/caracterLen";
import { caracterEspecial } from "../tools/caracterEspecial";
import { caracteresVazio } from "../tools/caracteresVazio";
import { digitosExiste } from "../tools/digitoExiste";
import { stringMaiuscula } from "../tools/stringMaiuscula";
import { stringMinuscula } from "../tools/stringMinuscula";
import { contDuplicadoCaracter } from "../tools/contDuplicadoCaracter";

const Validar = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.body?.senha
    ? request.body.senha
    : () => {
        response.status(400).send({
          mensagem: "Senha não informado.",
          pass: false,
        });
        return;
      };

  const { senha } = request.body as unknown as postPass;

  // Existe caracteres vazios
  if (caracteresVazio(senha) === false) {
    response.status(401).send(`Existe caracteres vazios.`);
    return;
  }

  // Verifica se existe ao menos 1 dígito.
  if (digitosExiste(senha) === false) {
    response.status(401).send({
      mensagem: `Ao menos 1 dígito.`,
      pass: false,
    });
    return;
  }

  // Variável configurável para definir o minimo caracter
  const minimoCaracter = parseInt(process.env.minimoCaracter || "9");

  // Minimo caracteres senha carregado pelo Env minimo 9
  if (caracterLen(senha, minimoCaracter) === false) {
    response.status(401).send({
      mensagem: `Senha não atendo o minimo carácter ${minimoCaracter}.`,
      pass: false,
    });
    return;
  }

  // Verifica se existe ao menos 1 letra minúscula.
  if (stringMinuscula(senha) === false) {
    response.status(401).send({
      mensagem: `Ao menos 1 letra minúscula.`,
      pass: false,
    });
    return;
  }

  // Verifica se existe ao menos 1 letra Maiúscula.
  if (stringMaiuscula(senha) === false) {
    response.status(401).send({
      mensagem: `Ao menos 1 letra Maiúscula.`,
      pass: false,
    });
    return;
  }

  // Verifica se existe ao menos 1 caracter especial.
  if (caracterEspecial(senha) === false) {
    response.status(401).send({
      mensagem: `Ao menos 1 caracter especial.`,
      pass: false,
    });
    return;
  }

  // Verifica se existe ao menos 1 caracter Repetidos.
  if (contDuplicadoCaracter(senha) === false) {
    response.status(401).send({
      mensagem: `Existem caracteres repetidos.`,
      pass: false,
    });
    return;
  }

  response.status(200).send({
    mensagem: `token XPTO`,
    pass: true,
  });
  return;
};

export default {
  Validar: Validar,
};
