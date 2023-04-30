import React from "react";
import ConfirmationDialog from "../ConfirmationDialog";
import Woman from "../../assets/woman-figure.svg";

const ViewReportModal = () => {
    const [reportModal, setReportModal] = React.useState(false);

  const handleClickReportModal = () => {
    setReportModal(true);
  };

  return (
    <div className="report-dialog">
      <ConfirmationDialog
        title="Quer saber mais sobre um local?"
        description="Clique em qualquer lugar do mapa para ter mais informações sobre um local e para fazer denúncias"
        handleFunction={handleClickReportModal}
        icon={Woman}
      />
    </div>
  );
};
