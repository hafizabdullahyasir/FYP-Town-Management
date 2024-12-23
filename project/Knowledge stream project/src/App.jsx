import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Recipet from "./components/Recipet";
import Towns from "./components/Towns";
import Leadgerbook from "./components/Leadgerbook";
// import Signup from "./components/Signup";
import TownDetails from "./components/TownDetails";
import TownInformation from "./components/TownInformation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/towns" element={<Towns />} />
      <Route path="/Leadger-book" element={<Leadgerbook />} />
      <Route path="/recipet" element={<Recipet />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/towns/:id" element={<TownDetails />} />
      <Route path="/town-information/:id" element={<TownInformation />} />
    </Routes>
  );
};

export default App;
