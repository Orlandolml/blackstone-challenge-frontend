import * as Yup from "yup";
import { withFormik } from "formik";
import { SignupFormValues } from "../../../shared/types/formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters of length")
    .required("Password is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  passwordConfirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export default withFormik<{}, SignupFormValues>({
  validationSchema,
  handleSubmit: () => {},
  validateOnMount: true,
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    lastName: "",
    passwordConfirmation: "",
  }),
});
