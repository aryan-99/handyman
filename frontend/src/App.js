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
            <Route path="/handyman-login" element={<Comps.HandymanLogin />} />
            <Route path="/logout" element={<Comps.Logout />} />
            <Route path="/profile" element={<Comps.Profile />} />
            <Route path="/dashboard" element={<Comps.Dashboard />} />
            <Route path="/request-workorder/:handle" element={<Comps.NewWorkOrder />} />
            <Route path="/profile/:handle" element={<Comps.CompanyProfile />} />
            <Route path="/message/:jobid" element={<Comps.Messages />} />
            <Route path="/:orderId/delete" element={<Comps.DeleteWorkOrder />} />
            <Route path="/create-job" element={<Comps.CreateJob />} />
            <Route path="/view-job/:jobId" element={<Comps.ViewJob />} />
            <Route path="/delete-job/:jobId" element={<Comps.DeleteJob />} />
            <Route path="/inbox" element={<Comps.Inbox />} />
            <Route path="/marketplace" element={<Comps.Marketplace />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
