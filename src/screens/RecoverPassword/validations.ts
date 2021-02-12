import * as yup from "yup";
import * as inputErrors from "../../constants/errors";

const schema = yup.object().shape({
  email: yup
    .string()
    .email(inputErrors.emailInput)
    .required(inputErrors.requiredField),
});

export default schema;
