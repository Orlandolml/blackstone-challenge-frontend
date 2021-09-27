import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  EyeTwoTone,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { FormikProps } from "formik";
import { Link } from "react-router-dom";
import { message, Spin, Input, Button } from "antd";
import "./index.styles.css";
import withFormik from "./withFormik";
import logo from "../../../public/logo.svg";
import { login } from "../../redux/userSlice";
import { hasErrors } from "../../utils/formik";
import APIClient from "../../modules/APIClient";
import { setAuthChecked } from "../../redux/appSlice";
import { wrapThunkAction } from "../../utils/reduxToolkit";
import { LoginFormValues } from "../../shared/types/formik";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Login = ({
  values,
  errors,
  handleChange,
}: FormikProps<LoginFormValues>) => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.user.isLoading);

  useEffect(() => {
    if (hasErrors(errors)) {
      let { email, password } = errors;

      setEmailError(email || "");
      setPasswordError(password || "");
    } else {
      if (emailError) {
        setEmailError(null);
      }
      if (passwordError) {
        setPasswordError(null);
      }
    }
  }, [errors]);

  const onLoginPress = (event: SyntheticEvent) => {
    wrapThunkAction(
      dispatch(login({ password: values.password, email: values.email }))
    )
      .then((action: any) => {
        APIClient.setAuthenticatedInstance(action.payload.token);
        dispatch(setAuthChecked(true));
      })
      .catch((error) => {});
  };

  return (
    <Spin tip="Loading ..." spinning={isLoading} wrapperClassName="container">
      <form className="login-container">
        <div className="login-header">
          <h1>Welcome</h1>
          <img src={logo} className="logo" />
        </div>
        <div className="login-inputs-container">
          <Input
            name="email"
            placeholder="email"
            className="email-input"
            prefix={<UserOutlined />}
            onChange={handleChange("email")}
          />
          <p>{emailError}</p>
          <Input.Password
            name="password"
            prefix={<LockOutlined />}
            placeholder="input password"
            onChange={handleChange("password")}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <p>{passwordError}</p>
        </div>
        <div className="login-footer">
          <Button
            type="primary"
            onClick={onLoginPress}
            disabled={hasErrors(errors)}
          >
            Login
          </Button>
          <span>
            Not a member?
            <Link to="/signup">
              <Button type="link">Signup</Button>
            </Link>
          </span>
        </div>
      </form>
    </Spin>
  );
};

export default withFormik(Login);
