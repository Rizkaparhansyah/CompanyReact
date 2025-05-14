import React, { useContext, useEffect, useState } from "react";
import "./Portfolio.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Sidebar from "../../img/BT-LOGO.png";
import Ecommerce from "../../img/ecommerce.png";
import HOC from "../../img/hoc.png";
import MusicApp from "../../img/musicapp.png";
import { themeContext } from "../../Context";
import axios from "axios";

const Portfolio = () => {
  // fetch data service brand

  const [berita, setBerita] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/beritaAjax") // Ganti URL sesuai dengan API Anda
      .then((response) => {
        setBerita(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="portfolio" id="portfolio">
      {/* heading */}
      <span style={{ color: darkMode ? "white" : "" }}>BERITA & PROGRAM</span>

      {/* slider */}
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        grabCursor={true}
        className="portfolio-slider"
      >
        {berita &&
          berita.map((data) => (
            <SwiperSlide>
              <img src={Sidebar} alt="Image" />
              <p className="berita">{data.description}</p>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Portfolio;
