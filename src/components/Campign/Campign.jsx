import "./Campign.css";
import img from "../../img/BT-LOGO.png";
import fb from "../../img/facebook.svg";
import wa from "../../img/sharewa.svg";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-scroll";
import Donasi from "../Donasi/Donasi";
import { useContext } from "react";
import { themeContext } from "../../Context";

const Campign = () => {
  const href1 = document.getElementById("href");

  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/campignAjax") // Ganti URL sesuai dengan API Anda
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [time, setTime] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, []);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="campign-bg" id="campign">
      <span
        style={{ color: darkMode ? "black" : "" }}
        className="campign-title"
      >
        CAMPIGN
      </span>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        grabCursor={true}
        className="campign-slider"
      >
        {data &&
          data.map((datas) => (
            <SwiperSlide>
              <div class="__cont" key={datas.id}>
                <div class="__card">
                  <div class="head-card">
                    <img src={`http://localhost:8000/storage/images/${encodeURI(datas.image)}`} alt="" />
                  </div>
                  <div class="body-card">
                    <h1>{datas.keluhan}</h1>
                    <p className="company">{datas.perusahaan}</p>
                  </div>
                  <hr />
                  <div className="kotak">
                    <div className="kotak-1">
                      <div className="head">Terkumpul</div>
                      <div className="rupiah">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(datas.terkumpul)}
                      </div>
                    </div>
                    <div className="kotak-2">
                      <div className="head">Sisa waktu</div>
                      <div className="rupiah">
                        {new Date(datas.target_waktu).getTime() <= time
                          ? "0"
                          : Math.round(
                              Math.abs(
                                new Date(datas.target_waktu).getTime() - time
                              ) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                        Hari
                      </div>
                    </div>
                  </div>

                  <div className="contain">
                    <progress
                      value={datas.terkumpul}
                      max={datas.target_uang}
                      className="progress"
                    />
                  </div>
                  <div className="donasi">
                    {new Date(datas.target_waktu).getTime() <= time ? (
                      <button className="btn-disable abu" id="btn">
                        {" "}
                        DONASI
                      </button>
                    ) : (
                      <a
                        href={`/donasi/${datas.id}`}
                        id="href"
                        className="btn-donasi"
                      >
                        <button id="btn"> DONASI</button>
                      </a>
                    )}
                    <a
                      href={`https://api.whatsapp.com/send?text=http://localhost:8000/donasi/${datas.id}`}
                      data-action="share/whatsapp/share"
                      className="btn-share"
                      target="_blank"
                    >
                      <img src={wa} className="btn-wa" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Campign;
