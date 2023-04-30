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

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M",
  });

  if (!isLoaded) return <CircularProgress />;
  return <GoogleMapsApi />;
}

function GoogleMapsApi() {
  const [addMarker, setAddMarker] = React.useState(false);
  const [reports, setReports] = React.useState<Array<Report>>([
    {
      description: "Fui assaltado em frente ao mercado que tem nessa rua, fiquei apavorado e tentei chamar a polícia, mas infelizmente não consegui recuperar o meu celular",
      anonymous: true,
      latitude: -8.048549686419,
      longitude: -34.9512858611799,
      type: "Com Matagal",
      date: new Date(),
    },
    {
      description: "Fui assaltado em frente ao mercado que tem nessa rua, fiquei apavorado e tentei chamar a polícia, mas infelizmente não consegui recuperar o meu celular",
      anonymous: true,
      latitude: -8.048065470511263,
      longitude: -34.95069542596983,
      type: "Pouca iluminação",
      date: new Date(),
    },
    {
      description: "Fui assaltado em frente ao mercado que tem nessa rua, fiquei apavorado e tentei chamar a polícia, mas infelizmente não consegui recuperar o meu celular",
      anonymous: true,
      latitude: -8.0498840947377,
      longitude: -34.95041996204561,
      type: "Pouca gente",
      date: new Date(),
    },
  ]);
  
  const handleOnClickAddButton = () => {
    window.location.replace(`/report`);
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

  const getReports = async () => {
    const response = await ReportService.getReports();

    if(response.status === 200) setReports(response.data);
  };

  useEffect(() => {
    getReports();

    const eventSource = new EventSource(`${process.env.REACT_APP_URL_BACK}`);
    eventSource.onmessage = (e) => setReports([...reports, JSON.parse(e.data)]);
  }, []);

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
        <IconButton onClick={handleOnClickAddButton}>
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
