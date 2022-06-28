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
        response.status(400).send("Senha não informado.");
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
    response.status(401).send(`Ao menos 1 dígito.`);
    return;
  }

  // Variável configurável para definir o minimo caracter
  const minimoCaracter = parseInt(process.env.minimoCaracter || "9");

  // Minimo caracteres senha carregado pelo Env minimo 9
  if (caracterLen(senha, minimoCaracter) === false) {
    response
      .status(401)
      .send(`Senha não atendo o minimo carácter ${minimoCaracter}.`);
    return;
  }

  // Verifica se existe ao menos 1 letra minúscula.
  if (stringMinuscula(senha) === false) {
    response.status(401).send(`Ao menos 1 letra minúscula.`);
    return;
  }

  // Verifica se existe ao menos 1 letra Maiúscula.
  if (stringMaiuscula(senha) === false) {
    response.status(401).send(`Ao menos 1 letra Maiúscula.`);
    return;
  }

  // Verifica se existe ao menos 1 caracter especial.
  if (caracterEspecial(senha) === false) {
    response.status(401).send(`Ao menos 1 caracter especial.`);
    return;
  }

    // Verifica se existe ao menos 1 caracter Repetidos.
    if (contDuplicadoCaracter(senha) === false) {
      response.status(401).send(`Existem caracteres repetidos.`);
      return;
    }

  response.status(200).send(senha);
  return;
};

export default {
  Validar: Validar,
};
