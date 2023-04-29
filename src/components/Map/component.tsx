import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "./styles.scss";

function Map() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M",
  });

  if (!isLoaded) return <>Loading...</>;
  return <GoogleMapsApi />;
}

function GoogleMapsApi() {
  return (
    <GoogleMap
      zoom={15}
      center={{ lat: -8.05087199438512, lng: -34.95105296337313 }}
      mapContainerClassName="map-container"
    ></GoogleMap>
  );
}

export default Map;
