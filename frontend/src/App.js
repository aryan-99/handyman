import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Comps from "./components";

class App extends React.Component {
  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Comps.Home />} />
            <Route path="/register" element={<Comps.Register />} />
            <Route path="/login" element={<Comps.Login />} />
            <Route path="/logout" element={<Comps.Logout />} />
            <Route path="/profile" element={<Comps.Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
