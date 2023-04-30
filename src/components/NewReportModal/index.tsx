import { useState } from "react";
import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../../components/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import LogoText from "../../assets/logo-text.svg";
import "./styles.scss";
import { ReportService } from "../../services/ReportService";

type NewReport = {
  reportType: Array<string>;
  isAnonymous: boolean;
  description: string;
  long: number;
  lat: number;
};

export default function NewReportModal() {
  const [reportType, setReportType] = useState<Array<string>>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [description, setDescription] = useState<string>("");

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
    const report: NewReport = {
      reportType: reportType,
      isAnonymous: isAnonymous,
      description: description,
      long: 0,
      lat: 0
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
                      checked={reportType.includes("Pouca Gente")}
                    />
                  }
                  value="Pouca Gente"
                  label="Pouca Gente"
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
              label="Descreva seu relato"
              multiline
              rows={2}
              style={{ width: "30vw", marginBottom: "10px" }}
              onChange={handleDescriptionChange}
            />

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
