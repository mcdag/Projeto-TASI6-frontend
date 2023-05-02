import React from 'react';
import List from '@mui/material/List';
import ReportItem from '../ReportItem';
import { Report } from "../../interfaces/Report";

interface PropsList {
  reports: Report[];
}

function ComponentsList({reports}: PropsList) {
  if(reports) {
    return (
      <List sx={{ width: '100vw', margin: "0px", padding: "0px", maxWidth: 360, bgcolor: 'background.paper' }}>
        { reports.map((report) => {
         return <ReportItem report={report}/>
        })
      }
      </List>
    );
  } else {
    <div>
    </div>
  }
}

export default ComponentsList;