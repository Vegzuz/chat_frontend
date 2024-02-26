import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ApiConnector from "../../../api/apiConnector";
import ApiEndpoints from "../../../api/apiEndpoints";
import AppPaths from "../../../lib/appPaths";
import CookieUtil from "../../../util/cookieUtil";
import "../authStyle.css";

const LoginScreen = ({ location }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (loginData) => {
    const successLoginData = await ApiConnector.sendPostRequest(
      ApiEndpoints.LOGIN_URL,
      JSON.stringify(loginData),
      false,
      false
    );
    if (successLoginData) {
      Object.keys(successLoginData).forEach((key) => {
        CookieUtil.setCookie(key, successLoginData[key]);
      });
      window.location.href = AppPaths.HOME;
    }
  };

  const getLoginMessage = () => {
    if (
      location &&
      location.state &&
      location.state.redirectFrom === AppPaths.SIGN_UP
    ) {
      return (
        <div id="loginMessage">
          Аккаунт успешно создан. Войдите в систему.
        </div>
      );
    }
    return null;
  };

  return (
    <div id="authFormContainer">
      <div id="authForm">
        {getLoginMessage()}
        <h2 id="authTitle">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="text"
              placeholder="phone_number"
              {...register("phone_number", { required: true })}
            />
            {errors.username && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <div className="authFieldContainer">
            <input
              className="authField"
              type="text"
              placeholder="verification_code"
              {...register("verification_code", { required: true })}
            />
            {errors.password && (
              <p className="requiredFieldError">This field is required</p>
            )}
          </div>
          <br />
          <button className="btn btn-outline-warning btn-block" type="submit">
            Login
          </button>
        </form>
        <p id="authFormFooter">
          Don't have any account! <Link to="/signup">Click here</Link> to
          singup.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
