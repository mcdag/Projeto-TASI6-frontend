import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createRoot } from "react-dom";
import Balaclava from "../../assets/balaclava1.svg";
import "./styles.scss";

function MyMap() {
  const [map, setMap] = React.useState();
  const mapOptions = {
    mapId: "f4786026ce478b81",
    center: { lat: -8.05087199438512, lng: -34.95105296337313 },
    zoom: 15,
    disableDefaultUI: true,
  };
  const ref = React.useRef();

  React.useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);

  return (
    <>
      <div ref={ref} style={{ width: "100%", height: "100%" }} />
      {map && <Reports map={map} />}
    </>
  );
}

const reports = {
  A: {
    description: "teste",
    isAnonymous: true,
    lat: -8.048614030329373,
    lng: -34.95056811172217,
    reportType: "Assalto",
    date: new Date(),
  },
  B: {
    description: "teste",
    isAnonymous: true,
    lat: -8.048549686419,
    lng: -34.9512858611799,
    reportType: "Com Matagal",
    date: new Date(),
  },
  C: {
    description: "teste",
    isAnonymous: true,
    lat: -8.048065470511263,
    lng: -34.95069542596983,
    reportType: "Com Matagal",
    date: new Date(),
  },
};

const ReportMarker = ({ reportType }) => {
  const MarkerImg = () => {
    switch (reportType) {
      case "Assalto":
        return Balaclava;
      case "Com Matagal":
        return Balaclava;
      // TODO: Acrescentar outros tipos de report + styles
      default:
        return Balaclava;
    }
  };

  return (
    <div>
      <img src={Balaclava} className="marker-img"></img>
    </div>
  );
};

function Reports({ map }) {
  const [data, setData] = React.useState(reports);
  const [highlighted, setHighlighted] = React.useState();

  return (
    <>
      {Object.entries(data).map(([key, report]) => (
        <Marker
          map={map}
          key={key}
          position={{ lat: report.lat, lng: report.lng }}
        >
          <div
            style={{width: '40px', height: '40px'}}
            className={`${highlighted === key ? 'highlighted' : ''}`}
            onMouseEnter={() => {
              console.log("hover");
              setHighlighted(key);
            }}
            onMouseLeave={() => setHighlighted(null)}
          >
            <ReportMarker reportType={report.reportType} />
          </div>
        </Marker>
      ))}
    </>
  );
}

function Marker({ map, children, position }) {
  const markerRef = React.useRef();
  const rootRef = React.useRef();

  React.useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");
      rootRef.current = createRoot(container);

      // eslint-disable-next-line no-undef
      markerRef.current = new google.maps.marker.AdvancedMarkerView({
        position,
        content: container,
      });
    }
  }, []);
  React.useEffect(() => {
    rootRef.current.render(children);
    markerRef.current.position = position;
    markerRef.current.map = map;
  }, [map, position, children]);
}

export default function Map() {
  return (
    <Wrapper
      apiKey={"AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M"}
      version="beta"
      libraries={["marker"]}
    >
      <MyMap />
    </Wrapper>
  );
}
