import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Login.css";
import "typeface-roboto";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Chama o método de login do AuthService
      const response = await AuthService.login(username, password);

      // Se o login for bem-sucedido, redireciona para a página desejada
      if (response.accessToken) {
        console.log("Redirecionando para /index");
        // Login bem-sucedido, redirecione para a página desejada
        navigate("/index");
      }
    } catch (error) {
      // Se houver um erro no login, exibe uma mensagem de erro
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content-left">
        <div className="login-form">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            alt="Logo"
            className="logo"
          />{" "}
          <h4>Bem-Vindo</h4>
          <h6 className="welcome-message">
            Entre com sua conta de Administrador
          </h6>
          <div className="text-danger form-text mb-2 fw-bold fs-5">{error}</div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nome de usuário"
              className="form-control fs-6"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Senha"
              className="form-control fs-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
