const request = require("supertest");
const app = require("../server");

jest.setTimeout(10000); // aumenta para 30 segundos

describe("Usuario Endpoints", () => {
  let usuarioId;

  it("Deve criar um novo usuário", async () => {
    const res = await request(app).post("/usuarios").send({
      nome: "João Silva",
      email: "joao@example.com",
      senha: "123456",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toBe("João Silva");
    usuarioId = res.body.id;
  });

  it("Deve listar todos os usuários", async () => {
    const res = await request(app).get("/usuarios");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Deve atualizar um usuário", async () => {
    const res = await request(app)
      .put(`/usuarios/${usuarioId}`)
      .send({ nome: "João Atualizado" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.nome).toBe("João Atualizado");
  });

  it("Deve deletar um usuário", async () => {
    const res = await request(app).delete(`/usuarios/${usuarioId}`);
    expect(res.statusCode).toEqual(204);
  });
});
