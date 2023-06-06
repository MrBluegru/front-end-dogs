import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Landing from "./components/Landing";
import ErrorC from "./components/Error";
import FormCreate from "./components/FormCreate";
import Details from "./components/Details";
import CreateOk from "./components/CreateOk"

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:id" element={<Details />} />
          <Route path="/createNewDog" element={<FormCreate />} />
          <Route path="/createDogOK" element={<CreateOk />} />
          <Route path="*" element={<ErrorC />} />
          
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
