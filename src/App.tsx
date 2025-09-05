import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import RegisterPage from "./pages/Register";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/futura2025.vercel.app" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/register/:id" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
