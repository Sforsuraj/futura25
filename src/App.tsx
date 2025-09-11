import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import RegisterPage from "./pages/Register";
import RegisterSheet from "./pages/RegisterSheet";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/register/:id" element={<RegisterPage />} />
        <Route path="/register@123" element={<RegisterSheet />} />
      </Routes>
    </Router>
  );
};

export default App;
