import { useState } from "react";

import Form from "./components/Form";
import "./App.scss";
import DataInformation from "./components/DataInformation";

function App() {
  const [dataVisibility, setDataVisibility] = useState(false); // стейт видимости окна информации о персональных данных

  const handleClick = () => {
    setDataVisibility(!dataVisibility);
  };
  const closeWindow = () => {
    setDataVisibility(false);
  };
  return (
    <div>
      <Form click={handleClick} closeWindow={closeWindow} />
      {dataVisibility && <DataInformation />}
    </div>
  );
}

export default App;
