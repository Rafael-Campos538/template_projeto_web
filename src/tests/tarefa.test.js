const request = require("supertest");
const app = require("../server");

jest.setTimeout(10000); // aumenta para 30 segundos

describe("Tarefa Endpoints", () => {
  let tarefaId;

  it("Deve criar uma nova tarefa", async () => {
    const res = await request(app).post("/tarefas").send({
      titulo: "Fazer exercícios",
      descricao: "Exercícios de programação",
      status: "pendente",
      data: "2025-05-26",
      usuario_id: 1,
      categoria_id: 1,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.titulo).toBe("Fazer exercícios");
    tarefaId = res.body.id;
  });

  it("Deve listar todas as tarefas", async () => {
    const res = await request(app).get("/tarefas");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Deve atualizar uma tarefa", async () => {
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ titulo: "Exercícios atualizados", status: "concluída" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.titulo).toBe("Exercícios atualizados");
  });

  it("Deve deletar uma tarefa", async () => {
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toEqual(204);
  });
});
