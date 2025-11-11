import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginRegisterForm from "@components/LoginRegisterForm";
import { loginService } from "@services/auth.service.js";
import luckyCat from "@assets/LuckyCat.png";
import "@styles/loginRegister.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const loginSubmit = async (data) => {
    try {
      const response = await loginService(data);
      if (response.request.status === 200) {
        navigate("/home");
      } else {
        setLoginError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="page-root">
      <div className="lucky-cat-container">
        <img src={luckyCat} alt="Lucky Cat" className="lucky-cat" />
      </div>
      <div className="login-register-container">
        <LoginRegisterForm mode="login" onSubmit={loginSubmit} loginError={loginError} />
      </div>
    </main>
  );
};

export default Login;
