import React, { useContext, useEffect, useState } from "react";
import "./Portfolio.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Sidebar from "../../img/BT-LOGO.png";
import { themeContext } from "../../Context";
import axios from "axios";
import { API } from "../../api/route";

const Portfolio = () => {
  // fetch data service brand

  const [berita, setBerita] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/beritaAjax`) // Ganti URL sesuai dengan API Anda
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
        {berita.map((data, index) => (
          <SwiperSlide key={index}>
            <img src={`${API}/storage/images/${encodeURI(data.image)}`} alt="Image" />
            <p className="berita">{data.description}</p>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default Portfolio;
