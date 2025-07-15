import React, { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Donasi from "../Donasi/Donasi";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import FormZakat from "../FORM/Zakat/FormZakat";

function AppRouter() {
  const [data, setData] = useState();
  const [ambil, setAmbil] = useState();
  useEffect(async () => {
    await axios
      .get("http://localhost:8000/api/campignAjax") // Ganti URL sesuai dengan API Anda
      .then((response) => {
        setAmbil(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Router>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/donasi/:id">
        <Donasi data={ambil} />
      </Route>
      <Route path="/zis">
        <FormZakat data={data} />
      </Route>
    </Router>
  );
}

export default AppRouter;
