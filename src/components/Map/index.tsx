import CircularProgress from "@mui/material/CircularProgress";
import "./styles.scss";
import React, { useMemo, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  MarkerClusterer,
} from "@react-google-maps/api";
import "./styles.scss";
import { Report } from "../../interfaces/Report";
import GunIcon from "../../assets/gun.svg";
import MataIcon from "../../assets/tree.svg";
import PeopleIcon from "../../assets/people.svg";
import LightIcon from "../../assets/light.svg";
import OtherIcon from "../../assets/other.svg";
import WomanIcon from "../../assets/woman.svg";

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
      reportType: ["Pouca iluminação"],
      date: new Date(),
    },
    {
      description: "teste",
      isAnonymous: true,
      lat: -8.04843934787899,
      lng: -34.952265321847854,
      reportType: ["Outro"],
      date: new Date(),
    },
    {
      description: "teste",
      isAnonymous: true,
      lat: -8.0498840947377,
      lng: -34.95041996204561,
      reportType: ["Pouca gente"],
      date: new Date(),
    },
    {
      description: "teste",
      isAnonymous: true,
      lat: -8.049299822731454,
      lng: -34.95303779804414,
      reportType: ["Assédio"],
      date: new Date(),
    },
  ];

  const markers = reports.map((report) => {
    let markerIcon = "";
    switch (report.reportType[0]) {
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
        key={report.lng}
        onClick={() => console.log(report)}
        position={{ lat: report.lat, lng: report.lng }}
        icon={markerIcon}
      />
    );
  });

  useEffect(() => {}, []);

  const center = useMemo(
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