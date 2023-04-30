import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../components/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { ReportService } from "../../services/ReportService";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import CircularProgress from "@mui/material/CircularProgress";
import { Report } from "../../interfaces/Report";
import "./styles.scss";
import Cookies from "js-cookie";

function Report() {
  const [reportType, setReportType] = useState<Array<string>>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [showMarker, setShowMarker] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAv1HV_sYP-O5MpzkzPxGhW0T34jq3-J7M",
  });

  const center = React.useMemo(
    () => ({ lat: -8.05087199438512, lng: -34.95105296337313 }),
    []
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "anonymous") {
      setIsAnonymous(true);
    } else {
      setIsAnonymous(false);
    }
  };
  
  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setReportType([...reportType, event.target.value]);
    } else {
      setReportType(reportType.filter((item) => item !== event.target.value));
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubimit = async () => {
    const id = Cookies.get('id');
    const report: Report = {
      user_id: id,
      type: reportType[0],
      anonymous: isAnonymous,
      description: description,
      longitude: position.lng,
      latitude: position.lat,
      date: new Date(),
    };
    const response = await ReportService.createReport(report);

    if (response.status === 200) {
      alert("Relato criado com sucesso!");
      setInterval(() => {
        window.location.replace(`/localization`);
      }, 5000);
    } else {
      alert("Erro ao criar relato... tente novamente mais tarde");
    }
  };

  function Map() {
    const handleOnClickMap = (e) => {
      setPosition({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      setShowMarker(true);
    }
  
    if (!isLoaded) return <CircularProgress />;
    return (
      <GoogleMap
        onClick={handleOnClickMap}
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
      >
        <>
          {showMarker ? <MarkerF position={position}/> : <></>}
        </>
      </GoogleMap>
    );
  }

  const CreateReportForm = () => (
    <>
      <div className="report-container">
        <div className="content-container">
          <div>
            <p className="title">Fazer um Relato</p>
            <p className="subtitle">Fortaleça a comunidade</p>
          </div>
        </div>
        <FormGroup>
          <div>
            <p className="subtitle">Tipo de Relato</p>
            <div className="content-container">
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckBoxChange(e)}
                      checked={reportType.includes("Assalto")}
                    />
                  }
                  value="Assalto"
                  label="Assalto"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckBoxChange(e)}
                      checked={reportType.includes("Assédio")}
                    />
                  }
                  value="Assédio"
                  label="Assédio"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckBoxChange(e)}
                      checked={reportType.includes("Outro")}
                    />
                  }
                  value="Outro"
                  label="Outro"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckBoxChange(e)}
                      checked={reportType.includes("Pouca iluminação")}
                    />
                  }
                  label="Pouca iluminação"
                  value="Pouca iluminação"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckBoxChange(e)}
                      checked={reportType.includes("Com matagal")}
                    />
                  }
                  value="Com matagal"
                  label="Com matagal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleCheckBoxChange(e)}
                      checked={reportType.includes("Pouca gente")}
                    />
                  }
                  value="Pouca gente"
                  label="Pouca gente"
                />
              </div>
            </div>
            <p color={"#929292"} className="subtitle">
              Perfil
            </p>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="meuperfil"
              name="radio-buttons-group"
            >
              <FormControlLabel
                control={
                  <Radio checked={!isAnonymous} onChange={handleRadioChange} />
                }
                value={"meu perfil"}
                label="Meu Perfil"
              />
              <FormControlLabel
                value={"anonymous"}
                control={
                  <Radio checked={isAnonymous} onChange={handleRadioChange} />
                }
                label="Anônimo"
              />
            </RadioGroup>
            <p color={"#929292"} className="subtitle">
              Relato
            </p>
            <TextField
              id="outlined-multiline-static"
              label="Descreva seu relato!"
              multiline
              rows={2}
              style={{ width: "30vw", marginBottom: "10px" }}
              onChange={handleDescriptionChange}
            />

            <Map />

            <div className="button">
              <Button
                onClick={handleSubimit}
                text="Enviar relato"
                type="submit"
              />
            </div>
          </div>
        </FormGroup>
      </div>
    </>
  );

  return <CreateReportForm />;
}

export default Report;