import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Report } from "../../interfaces/Report";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles.scss";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M",
  });

  if (!isLoaded) return <CircularProgress />;
  return <GoogleMapsApi />;
}

function GoogleMapsApi() {
  const reports: Array<Report> = [
    {
      description: "teste",
      isAnonymous: true,
      lat: -8.048614030329373,
      lng: -34.95056811172217,
      reportType: ["Assalto"],
      date: new Date(),
    },
    {
      description: "teste",
      isAnonymous: true,
      lat: -8.048549686419,
      lng: -34.9512858611799,
      reportType: ["Com Matagal"],
      date: new Date(),
    },
    {
      description: "teste",
      isAnonymous: true,
      lat: -8.048065470511263,
      lng: -34.95069542596983,
      reportType: ["Com Matagal"],
      date: new Date(),
    },
  ];

  const markers = reports.map((report) => (
    <MarkerF
      key={report.lng}
      onClick={() => console.log(report)}
      position={{ lat: report.lat, lng: report.lng }}
    />
  ));

  React.useEffect(() => {}, []);

  const center = React.useMemo(
    () => ({ lat: -8.05087199438512, lng: -34.95105296337313 }),
    []
  );

  return (
    <GoogleMap
      onClick={(e) => console.log(e.latLng!.lat(), e.latLng!.lng())}
      zoom={15}
      center={center}
      mapContainerClassName="map-container"

    >
      {markers}
    </GoogleMap>
  );
}

export default Map;
