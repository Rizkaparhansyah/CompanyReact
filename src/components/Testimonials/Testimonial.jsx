import React, { useEffect, useState } from "react";
import "./Testimonial.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Pagination } from "swiper";
import "swiper/css/pagination";
import profilePic1 from "../../img/BT-LOGO.png";
import profilePic2 from "../../img/BT-LOGO.png";
import profilePic3 from "../../img/BT-LOGO.png";
import profilePic4 from "../../img/BT-LOGO.png";
import axios from "axios";

const Testimonial = () => {
  const [inspirasi, setInspirasi] = useState([]);
  const [inspirasi1, setInspirasi1] = useState([]);
  const [inspirasi2, setInspirasi2] = useState([]);
  const [inspirasi3, setInspirasi3] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/inspirasiAjax")
      .then((res) => {
        setInspirasi(res?.data?.data[0]);
        setInspirasi1(res?.data?.data[1]);
        setInspirasi2(res?.data?.data[2]);
        setInspirasi3(res?.data?.data[3]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // const clients = [
  //   {
  //     img: profilePic1,
  //     review: inspirasi[0],
  //   },
  //   {
  //     img: profilePic2,
  //     review: inspirasi[1],
  //   },
  //   {
  //     img: profilePic3,
  //     review: inspirasi[2],
  //   },
  //   {
  //     img: profilePic4,
  //     review: inspirasi[3],
  //   },
  // ];

  return (
    <div className="t-wrapper" id="testimonial">
      <div className="t-heading">
        <span>INSPIRASI</span>

        <div
          className="blur t-blur1"
          style={{ background: "var(--purple)" }}
        ></div>
        <div className="blur t-blur2" style={{ background: "skyblue" }}></div>
      </div>
      <div className="container">
        <div className="container1">
          <img src={profilePic1} className="sec1" alt="" srcSet="" />
          <div className="sec2">
            <p>{inspirasi?.description_inspirasi}</p>
          </div>
        </div>
        <div className="container2">
          <div className="container123">
            <img src={profilePic2} className="sec10" />
            <img src={profilePic3} className="sec20" />
            <img src={profilePic4} className="sec30" />

            <div className="sec40">
              <p>{inspirasi1?.description_inspirasi}</p>
            </div>
            <div className="sec50">
              <p>{inspirasi2?.description_inspirasi}</p>
            </div>
            <div className="sec60">
              <p>{inspirasi3?.description_inspirasi}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
