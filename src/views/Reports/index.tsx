import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../components/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import PoliceDialog from "../../components/PoliceDialog";
import { ReportService } from "../../services/ReportService";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { Report } from "../../interfaces/Report";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import "./styles.scss";

function Reports() {
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

  const [policeDialog, setPoliceDialog] =  useState(false);
  const handlePoliceDialog = () => {
    setPoliceDialog(!policeDialog)
  }

  const handleClose = () => {
    window.location.replace(`${window.location.origin}/localization`);
  }

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
      setPoliceDialog(true);

      setInterval(() => {
        window.location.replace(`${window.location.origin}/localization`);
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
        <div className="arrow-button">
          <IconButton onClick={handleClose}>
            <ArrowBackIosIcon color="action"/>
          </IconButton>
        </div>
        <div className="title-container">
          <p className="title">Fazer um relato</p>
          <p className="subtitle">Fortaleça a comunidade!</p>
        </div>
        <FormGroup>
          <div>
            <p className="subtitle">Local do Relato</p>
            <div className="map-container">
              <Map/>
            </div>
            <p className="subtitle">Tipo de Relato</p>
            <div className="content-container">
              <div className='check-boxes'>
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
            <div className="send-report">
              <TextField
                sx={{ width: "80vw", marginBottom: "5%" }}
                className="text-field"
                label="Descreva seu relato!"
                variant="outlined"
                multiline
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
              />
              <div className="send-button">
                <Button
                  onClick={handleSubimit}
                  text="Enviar relato"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </FormGroup>
      </div>
      {policeDialog && <PoliceDialog handleFunction={handlePoliceDialog}/>}
    </>
  );

  return <CreateReportForm />;
}

export default Reports;