import * as Yup from "yup";
import { withFormik } from "formik";
import { LoginFormValues } from "../../../shared/types/formik";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid one")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default withFormik<{}, LoginFormValues>({
  validationSchema,
  handleSubmit: (values) => {},
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
});
