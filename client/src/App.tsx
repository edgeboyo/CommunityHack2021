import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";

export default function App() {
  const [token, setToken] = useState(undefined);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage token={token} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}
