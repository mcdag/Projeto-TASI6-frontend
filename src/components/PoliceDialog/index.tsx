import React from "react";
import PoliceIcon from "../../assets/police.svg";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import "./styles.scss";

interface Props {
  handleFunction: React.MouseEventHandler;
}

function PoliceDialog({
  handleFunction
}: Props) {
  const handleFunctionOpenPoliceReport = async (event: React.MouseEvent<Element, MouseEvent>) => {
    window.location.replace("https://delegaciavirtual.sinesp.gov.br/portal/home");
  }

  return (
    <Dialog
      hideBackdrop={true}
      PaperProps={{
        style: {
          borderRadius: "10px 10px 0px 0px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          overflowY: "unset",
          margin: "0px",
          position: "absolute",
          bottom: "0px",
        },
      }}
      className="confirmation-dialog-container"
      open={true}
      onClose={handleFunction}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <img className="icon" width="37.5%" src={PoliceIcon} alt="Ícone" />
      <DialogTitle className="title" id="confirmation-dialog-title">
        Deseja fazer um boletim de ocorrência?
      </DialogTitle>
      <DialogContent className="content">
        <DialogContentText id="confirmation-dialog-description">
          Caso queira reportar à policia o que houve, faça
          um boletim de ocorrência!
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Button variant="contained" className="button" onClick={handleFunction}>
          Não
        </Button>
        <Button variant="contained" className="button" onClick={handleFunctionOpenPoliceReport}>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PoliceDialog;
