import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import Services from "./components/Services/Services";
import Donasi from "./components/Donasi/Donasi";
import "./App.css";
import Portfolio from "./components/Portfolio/Portfolio";
import Testimonial from "./components/Testimonials/Testimonial";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Routers from "./components/Router/Router";
import { useContext } from "react";
import { themeContext } from "./Context";
import Campign from "./components/Campign/Campign";
import { BrowserRouter as Router, Route, RouterProvider } from 'react-router-dom'
import LandingPage from "./components/LandingPage/LandingPage";
import axios from "axios";

function App() {

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      className="App"
      style={{
        background: darkMode ? "black" : "",
        color: darkMode ? "white" : "",
      }}
    >

      <Routers />


    </div>
  );
}

export default App;
