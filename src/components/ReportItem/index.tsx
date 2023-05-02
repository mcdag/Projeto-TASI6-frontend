import React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Report } from "../../interfaces/Report";
import "./styles.scss";

export interface Props {
  report: Report;
}

function ReportItem({ report }: Props) {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "#6E77F6" }} src="/broken-image.jpg" />
        </ListItemAvatar>
        <div className="date-text">
          <ListItemText
            sx={{width: "80vw"}}
            primary="Anônimo"
            color="black"
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="p"
                  color="text.primary"
                  border="1px solid #00000045"
                  borderRadius="3px"
                  padding="2px"
                  fontSize="12px"
                  >
                  {report.type}
                </Typography>
                <p className="description">{report.description}</p>
              </React.Fragment>
            }
            />
            <div>{report.date?.toLocaleString()}</div>
        </div>

      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

export default ReportItem;
