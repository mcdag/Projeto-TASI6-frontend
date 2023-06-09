import React from "react";
import Cookies from "js-cookie";
import Button from "../../components/Button";
import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import { Auth } from "../../interfaces/User";
import { UserService } from "../../services/UserService";
import "./styles.scss";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const login: Auth = {
      username: username,
      password: password,
    };
    const response = await UserService.getLogin(login);
    if (response.status !== 200) {
      setError(true);
    } else {
      Cookies.set('id', response.data.userId);
      Cookies.set('token', response.data.authToken);
      window.location.replace(`${window.location.origin}/localization`);
    }
  };

  return (
    <>
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
              Username ou senha inválidos
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <div className="text-fields">
          <TextField
            sx={{ marginBottom: "5%" }}
            className="text-field"
            label="Username"
            variant="outlined"
            onChange={handleChangeUsername}
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
        <div className="button-register-div">
          <p className="button-text">Não tem uma conta ?</p>
          <a href={`${window.location.origin}/auth/register`}>
            <button className="button-register">Registre-se agora!</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Login;
