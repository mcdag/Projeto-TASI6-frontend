import React from "react";
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
  icon: string;
  title: string;
  description: string;
}

function ConfirmationDialog({
  handleFunction,
  icon,
  title,
  description,
}: Props) {
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
      onClick={handleFunction}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <img className="icon" width="37.5%" src={icon} alt="Ícone" />
      <DialogTitle className="title" id="confirmation-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent className="content">
        <DialogContentText id="confirmation-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" className="button" onClick={handleFunction}>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
