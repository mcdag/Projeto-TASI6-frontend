import React from "react";
import Button from "../../components/Button";
import { TextField } from "@mui/material";
import { User } from "../../interfaces/User";
import { UserService } from "../../services/UserService";
import "./styles.scss";

function Register() {
  const [name, setName] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const user: User = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    await UserService.createUser(user);
    window.location.replace(`${window.location.origin}/auth/login`);
  };

  return (
    <>
      <div className="general-register-container">
        <p className="title">Crie uma conta</p>
        <p className="subtitle"> Olá, boa jornada!</p>
        <div className="text-fields">
          <TextField
            sx={{ marginBottom: "5%" }}
            className="text-field"
            label="Nome"
            variant="outlined"
            onChange={handleChangeName}
          />
          <TextField
            sx={{ marginBottom: "5%" }}
            className="text-field"
            label="Nome de usuário"
            variant="outlined"
            onChange={handleChangeUsername}
          />
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
        <div className="button-register">
          <Button type="submit" onClick={handleClick} text="Registrar" />
        </div>
        <div className="has-login">
          <p className="button-login-div">Já tem uma conta? </p>
          <a href={`${window.location.origin}/auth/login`}>
            <button className="button-login">Faça login!</button>
          </a>
        </div>
      </div>
    </>
  );
}

export default Register;
