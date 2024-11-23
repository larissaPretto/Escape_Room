import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css"; // Importando os estilos

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      creator: true, // Adicionando o campo creator
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      // Registro bem-sucedido
      navigate("/login"); // Redireciona para a página de login após o registro
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Cadastro</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="password-requirements">
              A senha deve conter no mínimo 6 caracteres.
            </p>
          </div>
          <button type="submit" className="register-button">
            Cadastrar
          </button>
          <div className="register-link">
            <p>
              Já possui uma conta? <a href="/login">Faça login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
