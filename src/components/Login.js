import React, { useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoadingAPI, setIsLoadingApi] = useState(false);
  // Khi đã đăng nhập rồi sẽ chặn không cho người dùng vào lại trang login mà chuyển sang trang home
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Password and Email is required !!!");
    }
    setIsLoadingApi(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      toast.success("Login Succed");
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setIsLoadingApi(false);
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
        onClick={() => handleLogin()}
        disabled={email && password ? false : true}
        className={email && password ? "active-1" : "active-2"}
      >
        {isLoadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}
        &nbsp; Login
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i>Go back
      </div>
    </div>
  );
};

export default Login;
