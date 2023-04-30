import React from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import Map from "../../components/Map";
import "./styles.scss";

function Localization() {
  const [localizationDialog, setLocalizationDialog] = React.useState(false);
  const [reportDialog, setReportDialog] = React.useState(false);
  
  
  const closeReportDialog = () => {
    setReportDialog(false);
  };
  
  const closeLocalizationDialog = () => {
    setLocalizationDialog(false);
  };
  
  React.useEffect(() => {
    setTimeout(() => setReportDialog(true), 4000);
    setTimeout(() => setLocalizationDialog(true), 10000);
  }, []);
  

  return (
    <>
      <div className="container">
        <div className="map-container">
          <Map />
        </div>
        <div className="report-dialog">
          {reportDialog && (
            <ConfirmationDialog
              handleFunction={closeReportDialog}
              report={true}
              title="Quer saber mais sobre um local?"
              description="Clique em qualquer lugar do mapa para ter mais informações sobre um local e para fazer denúncias"
            />
          )}
        </div>
        <div className="localization-dialog">
          {localizationDialog && (
            <ConfirmationDialog
              handleFunction={closeLocalizationDialog}
              report={false}
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
