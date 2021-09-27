import * as yup from "yup"



const registerSchema = yup.object().shape({

  nome: yup.string().required(),
  sexo: yup.string().required(),
  idade: yup.string().required(),
  hobby: yup.string().required(),
  datanascimento: yup.string().required().matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)

}) 


export default registerSchema;