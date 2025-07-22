import React, { useContext, useEffect, useState } from "react";
import "./Intro.css";
import Vector1 from "../../img/Vector1.png";
import Vector2 from "../../img/Vector2.png";
import boy from "../../img/boy.png";
import glassesimoji from "../../img/glassesimoji.png";
import crown from "../../img/crown.png";
import FloatinDiv from "../FloatingDiv/FloatingDiv";
import Facebook from "../../img/Facebook.png";
import Instagram from "../../img/instagram.png";
import { themeContext } from "../../Context";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import axios from "axios";
import whatsapp from "../../img/wa.png";
import { API } from "../../api/route";
const Intro = () => {
  // fetch data
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/heroAjax`)
      .then((res) => {
        setHeroes(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // Transition
  const transition = { duration: 2, type: "spring" };

  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="Intro" id="Intro">
      {/* left name side */}
      {heroes.map((hero) => (
        <div className="i-left">
          <div className="i-name">
            <span style={{ color: darkMode ? "white" : "" }}>
              {hero.name_brand}
            </span>
          </div>
          <div className="desc">
            <p>Kilau Indonesia merupakan lembaga yang bergerak di bidang</p>
            <p>
              kemanusiaan dan memiliki program-program seperti Berbagi Makan,
            </p>
            <p>
              Berbagi Pendidikan, Berbagi Kesejahteraan dan lain sebagainya{" "}
            </p>
          </div>
          <Link to="contact" smooth={true} spy={true}>
            <button className="button i-button">Hire me</button>
          </Link>
          <div className="i-icons">
            <a href={hero.sosmed_instagram} target="_blank">
              <img src={Instagram} alt="" />
            </a>
          </div>
        </div>
      ))}
      <div className="i-right">
        <img src={Vector1} alt="" />
        <img src={Vector2} alt="" />
        <img src={boy} alt="" />
        <motion.img
          initial={{ left: "-36%" }}
          whileInView={{ left: "-24%" }}
          transition={transition}
          src={glassesimoji}
          alt=""
        />

        <motion.div
          initial={{ top: "-4%", left: "74%" }}
          whileInView={{ left: "68%" }}
          transition={transition}
          className="floating-div"
        >
          {heroes.map((hero) => (
            <FloatinDiv img={crown} text1={hero.name_brand} text2="" />
          ))}
        </motion.div>

        <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
        <div
          className="blur"
          style={{
            background: "#C1F5FF",
            top: "17rem",
            width: "21rem",
            height: "11rem",
            left: "-9rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Intro;
