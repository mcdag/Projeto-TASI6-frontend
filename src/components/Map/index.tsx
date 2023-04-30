import CircularProgress from "@mui/material/CircularProgress";
import React, { useMemo, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ReportService } from "../../services/ReportService";
import { Report } from "../../interfaces/Report";
import GunIcon from "../../assets/gun.svg";
import MataIcon from "../../assets/tree.svg";
import PeopleIcon from "../../assets/people.svg";
import LightIcon from "../../assets/light.svg";
import OtherIcon from "../../assets/other.svg";
import WomanIcon from "../../assets/woman.svg";
import ViewReportModel from "../ViewReportModal";
import "./styles.scss";

interface MapProps {
  reports: Report[];
}

interface GoogleMapsProps {
  reportsList: Report[];
}

function Map({reports}: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M",
  });

  if (!isLoaded) return <CircularProgress />;
  return <GoogleMapsApi reportsList={reports}/>;
}

function GoogleMapsApi({reportsList}: GoogleMapsProps) {
  const [addMarker, setAddMarker] = React.useState(false);
  const [reports, setReports] = React.useState<Array<Report>>(reportsList || []);
  
  const handleOnClickAddButton = () => {
    window.location.replace(`${window.location.origin}/report`);
  };

  const markers = reports.map((report) => {
    let markerIcon = "";
    switch (report.type) {
      case "Assalto":
        markerIcon = GunIcon;
        break;
      case "Com Matagal":
        markerIcon = MataIcon;
        break;
      case "Pouca iluminação":
        markerIcon = LightIcon;
        break;
      case "Outro":
        markerIcon = OtherIcon;
        break;
      case "Assédio":
        markerIcon = WomanIcon;
        break;
      case "Pouca gente":
        markerIcon = PeopleIcon;
    }

    return (
      <MarkerF
        key={report.longitude}
        onClick={() => setDialog(true)}
        position={{ lat: report.latitude, lng: report.longitude }}
        icon={markerIcon}
      />
    );
  });


  async function getReports() {
    const response = await ReportService.getReports();

    if(response.status === 200) {
      setReports(response.data);
    }
  }

  useEffect(() => {
    getReports();
    const eventSource = new EventSource(`${process.env.REACT_APP_URL_BACK}`);
    eventSource.onmessage = (e) => setReports([...reports, JSON.parse(e.data)]);
  }, [reports]);

  const center = useMemo(
    () => ({ lat: -8.05087199438512, lng: -34.95105296337313 }),
    []
  );
  const [dialog, setDialog] = React.useState(false);

  const closeDialog = () => {
    setDialog(!dialog);
  }

  return (
    <>
      <div className="add-report">
        <IconButton sx={{backgroundColor:"#6E77F6"}} onClick={handleOnClickAddButton}>
          <AddIcon /> 
        </IconButton>
      </div>    
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
      >
        {markers}
      </GoogleMap>
    {dialog && <ViewReportModel handleFunction={closeDialog} reports={reports} />}
    </>
  );
}

export default Map;
