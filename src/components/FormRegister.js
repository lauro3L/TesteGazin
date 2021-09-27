import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import registerSchema from "../Validations/registerSchema";
import MaskedInputDate from "./MaskedInputDate";
import FormatDate from "../Tools/FormatDate";

const FormRegister = (props) => {
  const Fields = {
    nome: "",
    sexo: "",
    idade: "",
    hobby: "",
    datanascimento: "",
  };

  useEffect(() => {
    if (props.idAtual == "") {
      setValues({
        ...FormRegister,
      });
    } else {
      setValues({
        ...props.developers[props.idAtual],
      });
    }
  }, [props.idAtual, props.developers]);

  let [values, setValues] = useState(Fields);

  const FieldManipulator = (e) => {
    let { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  function EmptForm() {
    setValues({
      nome: "",
      hobby: "",
      idade: "",
      datanascimento: "",
      sexo: "",
    });
  }
  const maniputadorFormShipping = async (e) => {
    e.preventDefault();

    let formData = {
      nome: e.target["nome"].value,
      sexo: e.target["sexo"].value,
      idade: e.target["idade"].value,
      hobby: e.target["hobby"].value,
      datanascimento: FormatDate(e.target["datanascimento"].value),
    };

    const isValid = await registerSchema.isValid(formData);

    if (isValid) {
      values.datanascimento = FormatDate(values.datanascimento);
      props.addAndEdit(values);
      EmptForm();
    }
  };

  return (
    <form autoComplete="off" onSubmit={maniputadorFormShipping}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Nome
        </span>
        <input
          type="text"
          className="form-control"
          name="nome"
          value={values.nome}
          onChange={FieldManipulator}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Sexo
        </span>
        <select
          className="form-select"
          aria-label="Default select example"
          name="sexo"
          value={values.sexo || ""}
          onChange={FieldManipulator}
        >
          <option value="">selecione o sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Idade
        </span>
        <input
          type="number"
          className="form-control"
          name="idade"
          value={values.idade || ""}
          onChange={FieldManipulator}
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          hobby
        </span>
        <input
          type="text"
          className="form-control"
          name="hobby"
          value={values.hobby || ""}
          onChange={FieldManipulator}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          DataNascimento
        </span>
        <MaskedInputDate
          className="form-control"
          name={"datanascimento"}
          value={values.datanascimento || ""}
          onChange={FieldManipulator}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          id="save"
          name="save"
          className="btn btn-primary btn-block col-12"
          value={props.idAtual == "" ? "Salvar" : "Atualizar"}
        />
      </div>
    </form>
  );
};

export default FormRegister;
