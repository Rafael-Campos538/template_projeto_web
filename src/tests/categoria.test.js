const request = require("supertest");
const app = require("../server");

jest.setTimeout(10000); // aumenta para 30 segundos

describe("Categoria Endpoints", () => {
  let categoriaId;

  it("Deve criar uma nova categoria", async () => {
    const res = await request(app)
      .post("/categorias")
      .send({ nome: "Estudos" });
    expect(res.statusCode).toEqual(201);
    expect(res.body.nome).toBe("Estudos");
    categoriaId = res.body.id;
  });

  it("Deve listar todas as categorias", async () => {
    const res = await request(app).get("/categorias");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("Deve atualizar uma categoria", async () => {
    const res = await request(app)
      .put(`/categorias/${categoriaId}`)
      .send({ nome: "Estudos Atualizados" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.nome).toBe("Estudos Atualizados");
  });

  it("Deve deletar uma categoria", async () => {
    const res = await request(app).delete(`/categorias/${categoriaId}`);
    expect(res.statusCode).toEqual(204);
  });
});
