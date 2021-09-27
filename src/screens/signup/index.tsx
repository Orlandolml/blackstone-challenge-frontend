import { FormikProps } from "formik";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import {
  EyeTwoTone,
  MailOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Input, Layout, Button, Spin } from "antd";
import "./index.styles.css";
import withFormik from "./withFormik";
import Header from "../../components/header";
import { hasErrors } from "../../utils/formik";
import { signup } from "../../redux/userSlice";
import APIClient from "../../modules/APIClient";
import { setAuthChecked } from "../../redux/appSlice";
import { wrapThunkAction } from "../../utils/reduxToolkit";
import { SignupFormValues } from "../../shared/types/formik";
import { useAppDispatch, useAppSelector } from "../../hooks";

const { Content } = Layout;

const Signup = ({
  values,
  errors,
  handleChange,
}: FormikProps<SignupFormValues>) => {
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (hasErrors(errors)) {
      let { name, email, lastName, password, passwordConfirmation } = errors;

      setNameError(name || "");
      setEmailError(email || "");
      setPasswordError(password || "");
      setLastNameError(lastName || "");
      setPasswordConfirmationError(passwordConfirmation || "");
    } else {
      if (nameError) {
        setNameError(null);
      }
      if (emailError) {
        setEmailError(null);
      }
      if (passwordError) {
        setPasswordError(null);
      }
      if (lastNameError) {
        setLastNameError(null);
      }
      if (passwordConfirmationError) {
        setPasswordConfirmationError(null);
      }
    }
  }, [errors]);

  const history = useHistory();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const onSignupPress = () => {
    wrapThunkAction(
      dispatch(
        signup({
          name: values.name,
          email: values.email,
          lastName: values.lastName,
          password: values.password,
        })
      )
    )
      .then((action: any) => {
        history.push("/");
        APIClient.setAuthenticatedInstance(action.payload.token);
        dispatch(setAuthChecked(true));
      })
      .catch(() => {});
  };

  return (
    <div className="signup-container">
      <Header
        onGoBackPress={() => {
          history.goBack();
        }}
        showExtraButton={false}
      ></Header>
      <Content>
        <Spin
          tip="Loading ..."
          spinning={isLoading}
          wrapperClassName="container"
        >
          <form className="signup-form-container">
            <h1>Create an account</h1>
            <div className="signup-inputs-container">
              <Input
                name="name"
                placeholder="Name"
                prefix={<UserOutlined />}
                onChange={handleChange("name")}
              />
              <p>{nameError}</p>
              <Input
                name="lastName"
                placeholder="Last name"
                prefix={<UserOutlined />}
                onChange={handleChange("lastName")}
              />
              <p>{lastNameError}</p>
              <Input
                name="email"
                placeholder="Email"
                prefix={<MailOutlined />}
                onChange={handleChange("email")}
              />
              <p>{emailError}</p>
              <Input.Password
                name="password"
                placeholder="Password"
                prefix={<LockOutlined />}
                onChange={handleChange("password")}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <p>{passwordError}</p>
              <Input.Password
                prefix={<LockOutlined />}
                name="passwordConfirmation"
                placeholder="Password confirmation"
                onChange={handleChange("passwordConfirmation")}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <p>{passwordConfirmationError}</p>
            </div>
            <Button
              type="primary"
              disabled={hasErrors(errors)}
              onClick={onSignupPress}
            >
              Signup!
            </Button>
          </form>
        </Spin>
      </Content>
    </div>
  );
};

export default withFormik(Signup);
