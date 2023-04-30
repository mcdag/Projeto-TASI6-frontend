import React from 'react';
import List from '@mui/material/List';
import ReportItem from '../ReportItem';
import { Report } from "../../interfaces/Report";

interface PropsList {
  reports: Report[];
}

function ComponentsList({reports}: PropsList) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      { reports.map((report) => {
       return <ReportItem report={report}/>
      })
    }
    </List>
  );
}

export default ComponentsList;