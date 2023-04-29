import React from 'react';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import ReportIcon from '../../assets/report-avatar.svg';
import LocalizationIcon from '../../assets/localization-avatar.svg';
import './styles.scss';
import MapIcon from '../../assets/map.svg';
import { useEffect } from 'react';

function Localization () {
  const [localizationDialog, setLocalizationDialog] = React.useState(true);
  const [reportDialog, setReportDialog] = React.useState(false);

  const handleClickReportDialog = () => {
    setReportDialog(!reportDialog);
  };

  const handleClickLocalizationDialog = () => {
    setLocalizationDialog(!localizationDialog);
  };

  // useEffect(() => {
  //   setLocalizationDialog(false);
  // }, [localizationDialog]);

  return (
    <div className='container'>
      <img src={MapIcon} alt='mapa'/>
      <div className='report-dialog'>
        {reportDialog && !localizationDialog &&
          <ConfirmationDialog handleFunction={handleClickReportDialog} icon={ReportIcon} title="Quer saber mais sobre um local?" description="Clique em qualquer lugar do mapa para ter mais informações sobre um local e para fazer denúncias" />}
      </div>
      <div className='localization-dialog'>
      {!reportDialog && 
          <ConfirmationDialog handleFunction={handleClickLocalizationDialog} icon={LocalizationIcon} title="Onde você está?" description="Use sua localização atual para poder ver os relatórios do local em que você está!" />}
      </div>
    </div>
  )
}

export default Localization; 