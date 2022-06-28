import { ISenhaValidada } from "../interfaces/senhaValidada";
import { caracterLen } from "../tools/caracterLen";
import { caracterEspecial } from "../tools/caracterEspecial";
import { caracteresVazio } from "../tools/caracteresVazio";
import { digitosExiste } from "../tools/digitoExiste";
import { stringMaiuscula } from "../tools/stringMaiuscula";
import { stringMinuscula } from "../tools/stringMinuscula";
import { contDuplicadoCaracter } from "../tools/contDuplicadoCaracter";

export class ValidadorSenha {
  private senhaValidada: ISenhaValidada;
  private pass: string;
  private minimoCaracter: number;

  constructor(pass: string, minimoCaracter: number) {
    this.pass = pass;
    this.minimoCaracter = minimoCaracter;
    this.senhaValidada = {
      statusCode: 401,
      mensagem: "Erro Padrao",
      pass: false,
    };
  }

  get getValidadorSenha() {
    this.ValidadorPass();
    return this.senhaValidada;
  }

  private ValidadorPass() {
    // Variável configurável para definir o minimo caracter
    const minimoCaracter = this.minimoCaracter;
    // Existe caracteres vazios
    if (caracteresVazio(this.pass) === false) {
      this.senhaValidada.mensagem = "Existe caracteres vazios.";
    }
    // Verifica se existe ao menos 1 dígito.
    else if (digitosExiste(this.pass) === false) {
      this.senhaValidada.mensagem = `Ao menos 1 dígito.`;
    }
    // Minimo caracteres senha carregado pelo Env minimo 9
    else if (caracterLen(this.pass, minimoCaracter) === false) {
      this.senhaValidada.mensagem = `Senha não atendo o minimo carácter ${minimoCaracter}.`;
    }
    // Verifica se existe ao menos 1 letra minúscula.
    else if (stringMinuscula(this.pass) === false) {
      this.senhaValidada.mensagem = `Ao menos 1 letra minúscula.`;
    }
    // Verifica se existe ao menos 1 letra Maiúscula.
    else if (stringMaiuscula(this.pass) === false) {
      this.senhaValidada.mensagem = `Ao menos 1 letra Maiúscula.`;
    }
    // Verifica se existe ao menos 1 caracter especial.
    else if (caracterEspecial(this.pass) === false) {
      this.senhaValidada.mensagem = `Ao menos 1 caracter especial.`;
    }
    // Verifica se existe ao menos 1 caracter Repetidos.
    else if (contDuplicadoCaracter(this.pass) === false) {
      this.senhaValidada.mensagem = `Existem caracteres repetidos.`;
    }
    // Criação de um JWT
    else{
      this.senhaValidada = {
        statusCode: 200,
        mensagem: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjU2NDI0ODQyODYwLCJjbGllbnRlIjoibWVhZXIiLCJleHBpcmFjYW8iOjE2OTE2MjYxMjkwMDB9.hvrNVhzj3ZY-X7pfYi0uAOq9M0e7m2011U13JzJv4j8",
        pass: true,
      }
    }
  }
}
