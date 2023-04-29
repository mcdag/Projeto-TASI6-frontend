import React from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import "./styles.scss";
import Map from "../../components/Map";
import Header from "../../components/Header";

function Localization() {
  const [localizationDialog, setLocalizationDialog] = React.useState(false);
  const [reportDialog, setReportDialog] = React.useState(false);

  const handleClickReportDialog = () => {
    setReportDialog(true);
  };

  const handleClickLocalizationDialog = () => {
    setLocalizationDialog(true);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="map-container">
          <Map />
        </div>
        <div className="report-dialog">
          {reportDialog && !localizationDialog && (
            <ConfirmationDialog
              handleFunction={handleClickReportDialog}
              title="Quer saber mais sobre um local?"
              description="Clique em qualquer lugar do mapa para ter mais informações sobre um local e para fazer denúncias"
            />
          )}
        </div>
        <div className="localization-dialog">
          {!localizationDialog && (
            <ConfirmationDialog
              handleFunction={handleClickLocalizationDialog}
              title="Onde você está?"
              description="Use sua localização atual para poder ver os relatórios do local em que você está!"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Localization;
