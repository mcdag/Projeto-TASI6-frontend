import React, { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import FmdBadIcon from '@mui/icons-material/FmdBad';
import "./styles.scss";

function Map() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M",
  });

  if (!isLoaded) return <>Loading...</>;
  return <GoogleMapsApi />;
}



function GoogleMapsApi() {
  const center = useMemo(() => ({ lat: -8.05087199438512, lng: -34.95105296337313 }), []);

  return (
    <GoogleMap
      zoom={15}
      center={center}
      mapContainerClassName="map-container"
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}

export default Map;
