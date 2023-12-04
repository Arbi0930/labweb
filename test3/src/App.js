import "./app.css";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import AllCountries from "./components/AllCountries/AllCountries";
import CountryInfo from "./components/CountryInfo/CountryInfo";

function App() {
  return (
    <>
      <div className="header">
        <div className="container">
          <h1>Лаборатори 11</h1>
        </div>
      </div>
      <div className="container">        
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllCountries />} />
            <Route path="/uls/:countryName" element={<CountryInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;