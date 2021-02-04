import * as yup from "yup";
import * as inputErrors from "../../constants/errors";

const schema = yup.object().shape({
  researchGate: yup.string().url(inputErrors.urlField),
  orcid: yup.string().url(inputErrors.urlField),
  resume: yup.string().max(700, inputErrors.maxLengthInput),
  publications: yup
    .array()
    .of(yup.object({ value: yup.string() }))
    .min(1),
  education: yup
    .array()
    .of(yup.object({ value: yup.string() }))
    .min(1),
});

export default schema;
