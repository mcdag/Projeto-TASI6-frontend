import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Report } from "../../interfaces/Report";
import ComponentsList from "../ComponentsList";
import Close from "@mui/icons-material/Close";
import "./styles.scss";

interface PropsDialog {
  handleFunction: React.MouseEventHandler;
  reports: Report[];
}

function ViewReportDialog({ handleFunction, reports }: PropsDialog) {
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
          width: "100vw"
        },
      }}
      className="view-report-dialog-container"
      open={true}
      onClick={handleFunction}
      aria-labelledby="view-report-dialog-title"
      aria-describedby="view-report-dialog-description"
    >
      <div className="title-button">
        <DialogTitle
          sx={{ padding: "0x", color: "#3b418e" }}
          id="view-report-dialog-title"
        >
          Denúncias locais
        </DialogTitle>
        <div className="button">
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "start",
              padding: "10px",
            }}
          >
            <IconButton
              sx={{ padding: "0px", margin: "0px" }}
              color="primary"
              aria-label="close"
              onClick={handleFunction}
            >
              <Close htmlColor="#000000" />
            </IconButton>
          </DialogActions>
        </div>
      </div>
      <DialogContent sx={{ padding: "0px 3px" }} className="content">
        <DialogContentText id="view-report-dialog-description">
          <ComponentsList reports={reports} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
