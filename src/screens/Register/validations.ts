import * as yup from "yup";
import * as inputErrors from "../../constants/errors";

const schema = yup.object().shape({
  fullName: yup.string().required(inputErrors.requiredField),
  siape: yup
    .string()
    .required(inputErrors.requiredField)
    .matches(/[0-9]+/gi, inputErrors.numberField)
    .max(9, inputErrors.numberField),
  lattes: yup
    .string()
    .url(inputErrors.urlField)
    .required(inputErrors.requiredField),
  knowledgeArea: yup.string().required(inputErrors.requiredField),
  academicTitle: yup.string().required(inputErrors.requiredField),
  academicUnit: yup.string().required(inputErrors.requiredField),
  course: yup.string().required(inputErrors.requiredField),
  email: yup
    .string()
    .email(inputErrors.emailInput)
    .required(inputErrors.requiredField),
  password: yup
    .string()
    .min(6, inputErrors.passwordInput)
    .required(inputErrors.requiredField),
});

export default schema;
