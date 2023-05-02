import CircularProgress from "@mui/material/CircularProgress";
import React, { useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import IconButton from "@mui/material/IconButton";
import AddAlertIcon from "@mui/icons-material/AddAlert";
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

function Map({ reports }: MapProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M",
  });

  if (!isLoaded) return <CircularProgress />;
  return <GoogleMapsApi reportsList={reports} />;
}

function setIcon(type: string) {
  let markerIcon = "";
  switch (type) {
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

  return markerIcon;
}

function GoogleMapsApi({ reportsList }: GoogleMapsProps) {
  const [reports, setReports] = React.useState<Array<Report>>(
    reportsList || []
  );

  const [selectedReport, setSelectedReport] = React.useState<Report>();
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);

  const [markers, setMarkers] = React.useState<JSX.Element[]>();

  const handleOnClickAddButton = () => {
    window.location.replace(`${window.location.origin}/report`);
  };

  const selectReport = (report: Report) => {
    setSelectedReport(report);
  };

  useEffect(() => {
    if (selectedReport) setDialog(true);
  }, [selectedReport]);

  React.useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/subscribe");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (isSubscribed) {
        const newReport: Report = {
          userId: data.userId,
          authToken: "",
          type: data.type,
          anonymous: true,
          description: data.description,
          date: data.date,
          longitude: data.longitude,
          latitude: data.latitude,
        };
        setReports((reports) => reports.concat(newReport));

        const markerIcon = setIcon(newReport.type);
        const marker = (
          <MarkerF
            key={newReport.longitude}
            onClick={() => selectReport(newReport)}
            position={{ lat: newReport.latitude, lng: newReport.longitude }}
            icon={markerIcon}
          />
        );

        setMarkers((markers) => markers!.concat(marker));
      }

      setIsSubscribed(true);
    };
  }, [markers, reports]);

  async function getReports() {
    const response = await ReportService.getReports();

    if (response.status === 200) {
      console.log(response.data);
      const responseReports: Report[] = response.data.reports.map(
        (report: Report) => {
          return {
            type: report.type,
            anonymous: true,
            description: report.description,
            longitude: report.longitude,
            latitude: report.latitude,
          };
        }
      );
      console.log("RESPONSE REPORTS->>>>", responseReports);
      const initialMarkers = responseReports.map((report) => {
        let markerIcon = setIcon(report.type);

        return (
          <MarkerF
            key={report.longitude + report.latitude}
            onClick={() => selectReport(report)}
            position={{ lat: report.latitude, lng: report.longitude }}
            icon={markerIcon}
          />
        );
      });

      setMarkers(initialMarkers);
      setReports(responseReports);
    }
  }

  useEffect(() => {
    getReports();
  }, []);

  const center = useMemo(
    () => ({ lat: -8.05087199438512, lng: -34.95105296337313 }),
    []
  );

  const closeDialog = () => {
    setDialog(false);
  };

  return (
    <>
      <div className="add-report">
        <IconButton
          sx={{ border: "1px solid red", backgroundColor: "#ffffff" }}
          size="large"
          onClick={handleOnClickAddButton}
        >
          <AddAlertIcon fontSize="inherit" color="error" />
        </IconButton>
      </div>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
      >
        {markers}
      </GoogleMap>
      {dialog && (
        <ViewReportModel
          handleFunction={closeDialog}
          reports={[selectedReport!]}
        />
      )}
    </>
  );
}

export default Map;
