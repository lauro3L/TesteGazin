const FormatDate = (param) => {
  return param.value.split("/").reverse().join("-");
};

export default FormatDate;
