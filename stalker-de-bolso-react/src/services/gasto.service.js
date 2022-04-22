import http from "../http-common";

class GastoDataService {
  getAll() {
    return http.get("/gastos");
  }

  get(id) {
    return http.get(`/gastos/${id}`);
  }

  create(data) {
    return http.post("/gastos", data);
  }

  update(id, data) {
    return http.put(`/gastos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/gastos/${id}`);
  }

  deleteAll() {
    return http.delete(`/gastos`);
  }

  findByNome(nome) {
    return http.get(`/gastos?nome=${nome}`);
  }
}

export default new GastoDataService();