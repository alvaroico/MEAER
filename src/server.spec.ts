require("dotenv").config();
import supertest from "supertest";
const appServer = require("./server");

const JWTAuthorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjU2NDI0ODQyODYwLCJjbGllbnRlIjoibWVhZXIiLCJleHBpcmFjYW8iOjE2OTE2MjYxMjkwMDB9.hvrNVhzj3ZY-X7pfYi0uAOq9M0e7m2011U13JzJv4j8`;

const padraoMenorUmDigito = "Ao menos 1 dígito.";
const padraoErroMinimo = "Senha não atende o mínimo de caracteres 9.";
const padraoCaracterRepetido = "Existem caracteres repetidos.";
const padraoCampoVazio = "Existem caracteres vazios.";
const padraoSenhaVazia = "Senha não informada.";
const padraoToken = "Token não identificado";

describe("Super Teste de Rotas", () => {
  it("Rota Home", async () => {
    const res = await supertest(appServer).get("/");
    expect(res.text).toEqual("Rota Home");
    expect(res.statusCode).toEqual(200);
  });
  it("Rota Senha com JWT", async () => {
    const res = await supertest(appServer)
      .get("/senha")
      .set("Authorization", JWTAuthorization);
    expect(res.text).toEqual("Rota Senha");
    expect(res.statusCode).toEqual(200);
  });
  it("Rota Senha sem JWT", async () => {
    const res = await supertest(appServer)
      .get("/senha")
      .set("Authorization", "JWTAuthorization");      
    expect(res.text).toEqual(padraoToken);
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha Password", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "AbTp9!fok",
      });
    expect(res.body).toEqual({
      mensagem: JWTAuthorization,
      pass: true,
    });
    expect(res.statusCode).toEqual(200);
  });
  it("Rota Senha Null ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: null,
      });
    expect(res.body).toEqual({
      mensagem: padraoSenhaVazia,
      pass: false,
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Rota Senha Vazio ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: " ",
      });
    expect(res.body).toEqual({
      mensagem: padraoMenorUmDigito,
      pass: false,
    });
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha aa ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "aa",
      });
    expect(res.body).toEqual({
      mensagem: padraoErroMinimo,
      pass: false,
    });
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha ab ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "ab",
      });
    expect(res.body).toEqual({
      mensagem: padraoErroMinimo,
      pass: false,
    });
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha AAAbbbCc ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "ab",
      });
    expect(res.body).toEqual({
      mensagem: padraoErroMinimo,
      pass: false,
    });
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha AbTp9!foo ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "AbTp9!foo",
      });
    expect(res.body).toEqual({
      mensagem: padraoCaracterRepetido,
      pass: false,
    });
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha AbTp9!foA ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "AbTp9!foA",
      });
    expect(res.body).toEqual({
      mensagem: padraoCaracterRepetido,
      pass: false,
    });
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha AbTp9 fok ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "AbTp9 fok",
      });
    expect(res.body).toEqual({
      mensagem: padraoCampoVazio,
      pass: false,
    });
    expect(res.statusCode).toEqual(401);
  });
  it("Rota Senha nome Objeto errado ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: 1,
      });
    expect(res.body).toEqual({
      mensagem: padraoSenhaVazia,
      pass: false,
    });
    expect(res.statusCode).toEqual(400);
  });
  it("Rota Senha Array onde e String ", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: ["AbTp9 fok"],
      });
    expect(res.body).toEqual({
      mensagem: padraoSenhaVazia,
      pass: false,
    });
    expect(res.statusCode).toEqual(400);
  });
});
