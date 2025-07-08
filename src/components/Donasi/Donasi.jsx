import "../Donasi/Donasi.css";
import img from "../../img/BT-LOGO.png";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { QRCodeCanvas } from "qrcode.react";

const Donasi = () => {
  const [inp, setInp] = useState();
  // get id
  const sId = window.location.pathname;
  let newId = sId.split("/")[2];
  const [datas, setData] = useState();
  const [test, setTest] = useState();

  // get data
  function onLoad() {
    fetch("http://localhost:8000/campignAjax/" + newId + "/edit")
      .then((response) => response.json())
      .then((data) => {
        setTest(data.result);
        document.getElementById("pro").innerText = JSON.stringify(
          data.result.keluhan
        );
        document.getElementById("tes").innerText = JSON.stringify(
          "Terkumpul " +
            ": " +
            new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(data.result.terkumpul)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  // get value
  function handleData({ target }) {
    setData(target.value);
  }
  function handleInp({ target }) {
    setInp(target.value);
  }
  // axios create
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  //handleSubmit 2
  const formik = useFormik({
    onSubmit: async (values) => {
      const terkumpul = parseInt(test.terkumpul) + parseInt(datas);
      const put = parseInt(test.terkumpul) + parseInt(inp);
      await http.get("/sanctum/csrf-cookie");
      await http
        .put("http://localhost:8000/api/campignAjax/" + newId, {
          image: test.image,
          keluhan: test.keluhan,
          perusahaan: test.perusahaan,
          target_uang: test.target_uang,
          terkumpul: terkumpul ? terkumpul : put,
          target_waktu: test.target_waktu,
          waktu_mulai_donasi: test.waktu_mulai_donasi,
        })
        .then((response) => {
          swal({
            title: "Terimakasih!",
            text: "Anda telah berdonasi, semoga teganti dengan lebih",
            icon: "success",
          }).then((willDelete) => {
            if (willDelete) {
              window.location.href = "/donasi/" + newId;
            }
          });
        })
        .catch((error) => {
          swal({
            title: "Gagal!",
            text: "Maaf terjadi kesalahan!",
            icon: "warning",
          }).then((willDelete) => {
            if (willDelete) {
              window.location.href = "/donasi/" + newId;
            }
          });
        });
    },
  });
  // value form
  const donasi = [
    {
      id: 1,
      nominal: 10000,
    },
    {
      id: 2,
      nominal: 20000,
    },
    {
      id: 3,
      nominal: 50000,
    },
    {
      id: 4,
      nominal: 100000,
    },
    {
      id: 5,
      nominal: 200000,
    },
  ];

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={"081231232113"}
      size={300}
      bgColor={"#fff"}
      level={"H"}
    />
  );
  return (
    <div className="cont" onLoad={onLoad}>
      <div className="__card-1">
        <img src={img} alt="" />
        <div className="grid-text">
          <div className="desk" id="pro"></div>
          <div className="desk" id="tes"></div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="__card-2">
          <Link to="/">
            <div className="back">Kembali</div>
          </Link>
          <div className="pilih-donasi">
            <p className="text">Nominal Donasi</p>
            <div className="btn-price">
              <div className="nominal">
                {" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(donasi[0].nominal)}
              </div>
              <label className="minimal">Nominal minimal donasi</label>
            </div>
            {donasi &&
              donasi.map((data, index) => (
                <div key={index}>
                  <input
                    onClick={handleData}
                    className="nominal"
                    id="nominal"
                    value={data.nominal}
                    readOnly
                  />
                </div>
              ))}
            <p className="text">Masukan Donasi Manual</p>

            <input
              onChange={handleInp}
              type="number"
              className="btn-price-solo"
              placeholder="Contoh : Rp 50.000"
            />
            <img
              src="	https://berbagibahagia.org/gambarUpload/gopay.png"
              alt=""
              width={250}
            />

            <div className="payment">
              <div className="scan">SCAN HERE</div>
              <div className="qrcode">{qrcode}</div>
            </div>
            <button className="button-bayar" type="submit">
              DONASI
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Donasi;
