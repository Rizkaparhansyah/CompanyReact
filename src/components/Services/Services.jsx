import React, { useContext, useEffect, useState } from "react";
import "./Services.css";
import Card from "../Card/Card";
import HeartEmoji from "../../img/heartemoji.png";
import Glasses from "../../img/glasses.png";
import Humble from "../../img/humble.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import axios from "axios";
import { API } from "../../api/route";

const Services = () => {
  // fetch data services card
  const [services, setServices] = useState([]);
  const [services1, setServices1] = useState([]);
  const [services2, setServices2] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/servicesAjax`)
      .then((res) => {
        setServices(res.data.data[0]);
        setServices1(res.data.data[1]);
        setServices2(res.data.data[2]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // fetch data service brand

  // const [serviceBrand, setServiceBrand] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${API}/api/servicesBrandAjax`)
  //     .then((res) => {
  //       // setServiceBrand(res.data.data[0]);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  // transition
  const transition = {
    duration: 1,
    type: "spring",
  };

  return (
    <div className="services" id="services">
      {/* left side */}
      <div className="awesome">
        {/* dark mode */}
        <span style={{ color: darkMode ? "white" : "" }}>My Awesome</span>
        <span>Services</span>
        {/* <span>{serviceBrand?.description}</span> */}

        <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>
      </div>
      <div className="cards">
        <motion.div
          initial={{ left: "25rem" }}
          whileInView={{ left: "14rem" }}
          transition={transition}
        >
          <Card
            emoji={HeartEmoji}
            heading={services?.name_services}
            detail={services?.description_services}
            // link={services?.link_services}
          />
        </motion.div>
        {/* second card */}
        <motion.div
          initial={{ left: "-11rem", top: "12rem" }}
          whileInView={{ left: "-4rem" }}
          transition={transition}
        >
          <Card
            emoji={Glasses}
            // link={services1?.link_services}
            heading={services1?.name_services}
            detail={services1?.description_services}
          />
        </motion.div>
        {/* 3rd */}
        <motion.div
          initial={{ top: "19rem", left: "25rem" }}
          whileInView={{ left: "22rem" }}
          transition={transition}
        >
          <Card
            emoji={Humble}
            // link={services2?.link_services}
            heading={services2?.name_services}
            detail={services2?.description_services}
            color="rgba(252, 166, 31, 0.45)"
          />
        </motion.div>

        <div
          className="blur s-blur2"
          style={{ background: "var(--purple)" }}
        ></div>
      </div>
    </div>
  );
};

export default Services;
