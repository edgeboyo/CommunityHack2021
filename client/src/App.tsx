import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";

export default function App() {
  const [token, setToken] = useState(undefined);

  if (!token) {
    return <Login props={{ token: token, setToken: setToken }} />;
  }

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
