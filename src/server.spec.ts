require("dotenv").config();
import supertest from "supertest";
const appServer = require("./server");

const JWTAuthorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjU2NDI0ODQyODYwLCJjbGllbnRlIjoibWVhZXIiLCJleHBpcmFjYW8iOjE2OTE2MjYxMjkwMDB9.hvrNVhzj3ZY-X7pfYi0uAOq9M0e7m2011U13JzJv4j8`;

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
  it("Rota Senha Password", async () => {
    const res = await supertest(appServer)
      .post("/senha/pass")
      .set("Authorization", JWTAuthorization)
      .send({
        senha: "AbTp9!fok",
      });
    expect(res.body).toEqual({
      mensagem: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjU2NDI0ODQyODYwLCJjbGllbnRlIjoibWVhZXIiLCJleHBpcmFjYW8iOjE2OTE2MjYxMjkwMDB9.hvrNVhzj3ZY-X7pfYi0uAOq9M0e7m2011U13JzJv4j8',
      pass: true
    });
    expect(res.statusCode).toEqual(200);
  });
});
