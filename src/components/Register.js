import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FormRegister from "./FormRegister";
import Api from "../Service/api";
import { FaPencilAlt, FaTrash, FaSearch } from "react-icons/fa";
import Moment from "moment";


const Register = () => {
  let [developers, setDevelopers] = useState({});
  let [dev, setDev] = useState({});
  let [idAtual, setIdAtual] = useState("");
  let [chave, setChave] = useState("");
  let [search, setSearch] = useState("");
  let [pagination, setPagination] = useState("");

  useEffect(() => {
    try {
      Api.get("developers/").then((response) => {
        setDevelopers(response.data.rows);
    
      });
    } catch {
      console.log("error ocorreu");
    }
  }, [dev]);
  function ButtonsPagination(param) {
      return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {Array(param)
            .fill("")
            .map((_, index) => {
              return (
                <button className="btn btn-primary" key={index}>
                  {index + 1}
                </button>
              );
            })}
        </div>
      );
  }
 
  useEffect(() => {
    Api.get(`developers?nome=${search.toLowerCase()}`)
      .then((response) => {
        setDevelopers(response.data.rows);
        setPagination(ButtonsPagination(response.data.count));
      })
      .catch(function (error) {
        if (error.response.status == 404) setDevelopers({});
      });
  }, [search]);

  const deleteDevelopers = (key) => {
    if (window.confirm("Deseja realmente deletar o cadastro")) {
      Api.delete(`/developers/${key}`);
      setDev({});
    }
  };

  const addAndEdit = (obj) => {
    if (chave == "") {
      Api.post("/developers", obj);
      setDev({});
    } else {
      
      Api.put(`/developers/${chave}`, obj);
      setIdAtual("");
      setChave("");
      setDev("");
     
    }
  };
  return (
    <>
      <div className="container-fluid bg-light p-5">
        <h1 className="display-4">Desenvolvedores</h1>
        <p className="lead">Cadastro</p>
      </div>
      <div className="row">
        <div className="col-md-5">
          <FormRegister {...{ addAndEdit, idAtual, developers }} />
        </div>

        <div className="col-md-7">
          <div className="col-md-12">
            <div class="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Filtro Pesquisa (Nome)
              </span>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <table className="table table-bordered table stripped block col-12">
              <thead>
                <tr>
                  <td>Nome</td>
                  <td>Sexo</td>
                  <td>Idade</td>
                  <td>Hoby</td>
                  <td>Data Nascimento</td>
                  <td>Ação</td>
                </tr>
              </thead>
              <tbody>
                {Object.keys(developers).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{developers[id].nome}</td>
                      <td>{developers[id].sexo}</td>
                      <td>{developers[id].idade}</td>
                      <td>{developers[id].hobby}</td>
                      <td>
                       
                        {Moment(developers[id].datanascimento)
                          .utc()
                          .format("DD/MM/YYYY")}
                      </td>
                      <td>
                        <div className="btn-group">
                          <a
                            className="btn btn-primary"
                            onClick={() => {
                              setIdAtual(id);
                              setChave(developers[id].id);
                            }}
                          >
                            <i>
                              <FaPencilAlt />
                            </i>
                          </a>
                          <a
                            className="btn btn-danger"
                            onClick={() => deleteDevelopers(developers[id].id)}
                          >
                            <i>
                              <FaTrash />
                            </i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {pagination}
        </div>
       
      </div>
    </>
  );
};

export default Register;
