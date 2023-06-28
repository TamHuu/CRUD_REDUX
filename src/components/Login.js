import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginRedux } from "../redux/actions/userAction";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    console.log(">>>>check event", event);
    if (!email || !password) {
      toast.error("Password and Email is required !!!");
    }
    dispatch(handleLoginRedux(email, password));
  };

  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account, navigate]);
  const handleGoBack = () => {
    navigate("/");
  };
  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container col-xs-12 col-md-6 col-lg-4 ">
      <div className="login-title">Login</div>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        placeholder="Email or username"
        className="input-email"
      />
      <div className="text">Password</div>
      <div className="contain-input-password">
        <input
          onKeyDown={(event) => handlePressEnter(event)}
          type={isShowPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="input-password"
        />

        <i
          className={
            isShowPassword === true
              ? "fa-sharp fa-solid fa-eye"
              : "fa-sharp fa-solid fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>

      <button
        onClick={(event) => handleLogin(event)}
        disabled={email && password ? false : true}
        className={email && password ? "active-1" : "active-2"}
      >
        {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
        &nbsp; Login
      </button>
      <div className="go-back" onClick={() => handleGoBack()}>
        <i className="fa-solid fa-angles-left"></i>&nbsp;Go back
      </div>
    </div>
  );
};

export default Login;
