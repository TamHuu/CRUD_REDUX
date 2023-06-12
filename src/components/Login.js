import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="login-title">Login</div>
      <div className="text">Email or username</div>
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
        disabled={email && password ? false : true}
        className={email && password ? "active-1" : "active-2"}
      >
        Login
      </button>
      <div className="back">
        <i className="fa-solid fa-angles-left"></i>Go back
      </div>
    </div>
  );
};

export default Login;
