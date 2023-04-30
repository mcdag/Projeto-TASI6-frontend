import Button from "../../components/Button";
import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import { Auth } from "../../interfaces/User";
import { UserService } from "../../services/UserService";
import Header from "../../components/Header";
import React from "react";
import "./styles.scss";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const login: Auth = {
      email: email,
      password: password,
    };
    const response = await UserService.getLogin(login);
    if (response.status !== 200) {
      setError(true);
    } else {
      window.location.replace(`/localization`);
    }
  };

  return (
    <>
      <Header />
      <div className="general-login-container">
        <p className="title">Faça o login</p>
        <p className="subtitle"> Bem-vindo de volta!</p>
        <p className="subtitle"> Nós sentimos sua falta </p>
        <div className="invalid-auth">
          {error ? (
            <Alert
              sx={{ width: "100%", justifyContent: "center" }}
              severity="error"
            >
              Email ou senha inválidos
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <div className="text-fields">
          <TextField
            sx={{ marginBottom: "5%" }}
            className="text-field"
            label="Email"
            variant="outlined"
            onChange={handleChangeEmail}
          />
          <TextField
            type="password"
            className="text-field"
            label="Senha"
            variant="outlined"
            onChange={handleChangePassword}
          />
        </div>
        <div className="forgot-password">
          <button className="button-forget-password">Esqueceu a senha?</button>
        </div>
        <div className="button-submit">
          <Button type="submit" onClick={handleClick} text="Entrar" />
        </div>
        <div className="button-register">
          <p className="button-text">Não tem uma conta ?</p>
          <a href={`${window.location.origin}/auth/register`}>
            <button className="button">Registre-se agora!</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
