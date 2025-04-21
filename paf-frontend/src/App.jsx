import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
              <Route
                  path="/login/oauth2/code/google"
                  element={<OAuth2RedirectHandler />}
              />
              <Route element={<HomePage />} path="/" />
              <Route element={<LoginPage />} path="/login" />
              <Route element={<RegisterPage />} path="/register" />
          </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
