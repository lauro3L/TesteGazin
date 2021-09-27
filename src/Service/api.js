import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(async (config) => {

  //Forcei uma cadastro de Login para gerar o Token

  let response = await axios.post("http://localhost:3000/sessions", {
    email: "joao@gmail.com",
    password: "1234"
  });

  if (response.data.message) {
    await axios.post("http://localhost:3000/login", {
      nome: "Joao da Silva",
      email: "joao@gmail.com",
      password: "1234",
    });

    response = await axios.post("http://localhost:3000/sessions", {
      email: "joao@gmail.com",
      password: "1234"
    });
  }

  config.headers["Authorization"] = `Bearer ${response.data.token}`;


  return config;
});

export default api;
