import React from "react";
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { themeContext } from "../../Context";
import hand from "../../img/zakat.png";
import kotakamal from "../../img/kotakamal.png";
import galangdana from "../../img/galangdana.png";
import masjid from "../../img/masjid.png";
import "./Zakat.css";
import { Link } from "react-router-dom";

const Zakat = () => {
  return (
    <div className="zakat-bg" id="category">
      {/* {data && data.map((datas) =>  */}
      <Link to="/zis" className="linkto">
        <div className="card-zakat">
          <img src={hand} className="logo" alt="" srcSet="" />
          <div className="category">DONASI</div>
        </div>
      </Link>
      <Link to="/zis" className="linkto">
        <div className="card-zakat">
          <img src={masjid} className="logo" alt="" srcSet="" />
          <div className="category">ZAKAT</div>
        </div>
      </Link>
      <Link to="/zis" className="linkto">
        <div className="card-zakat">
          <img src={kotakamal} className="logo" alt="" srcSet="" />
          <div className="category">INFAK</div>
        </div>
      </Link>
      <Link to="/zis" className="linkto">
        <div className="card-zakat">
          <img src={galangdana} className="logo" alt="" srcSet="" />
          <div className="category">GALANG DANA</div>
        </div>
      </Link>

      {/* )} */}
    </div>
  );
};

export default Zakat;
