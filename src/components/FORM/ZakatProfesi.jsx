import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Collapsible from "react-collapsible";
import swal from "sweetalert";
import Modal from "react-modal";
import grup from "../../img/grupdonate.png";
import user from "../../img/user.png";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";

const ZakatProfesi = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }
  const inputRef = useRef(null);

  const [bulan, setBulan] = useState();
  const [bonus, setBonus] = useState();
  const [data, setData] = useState();

  const handleBulanan = (e) => {
    setBulan(e.target.value);
  };
  const handleBonus = (e) => {
    setBonus(e.target.value);
  };
  useEffect(async () => {
    await axios
      .get("http://localhost:8000/zakatAjax") // Ganti URL sesuai dengan API Anda
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const formik = useFormik({
    initialValues: {
      nik: "",
      nama: "Anonimous",
      jml_donasi: "",
      tipe_zakat: props.tes,
    },
    onSubmit: async (values) => {
      const csrf = await http.get("/sanctum/csrf-cookie");
      console.log("csrf =", csrf);
      await http
        .post("zakatAjax", values)
        .then(
          (response) => console.log(response),
          swal({
            title: "Sukses!",
            text: "Terimakasih sudah berdonasi!",
            icon: "success",
          })
        )
        .catch((error) => console.error(error));
    },
  });
  return (
    <div className="_card">
      <Collapsible
        trigger={
          <div className="label-c">
            <label htmlFor="" className="kalkulate">
              Silahkan masukan jumlah zakat anda, atau hitung dengan{" "}
              <label htmlFor="" id="kalkulate">
                Klik Disini
              </label>
            </label>
          </div>
        }
      >
        <div className="kal">
          <div className="card-kal">
            <label htmlFor="">Pendapatan Perbulan (wajib di isi)</label>
            <input type="number" id="bulanan" noSpin onChange={handleBulanan} />
          </div>
          <div className="card-kal">
            <label htmlFor="" id="bonus">
              Bonus, THR Lainnya (jika ada)
            </label>
            <input type="number" noSpin onChange={handleBonus} />
          </div>
        </div>
      </Collapsible>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-zakat">
          <label htmlFor="" className="label">
            NIK
          </label>
          <input
            type="text"
            placeholder="Masukan NIK anda"
            className="inpZkt"
            name="nik"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nik}
          />
          <label htmlFor="" className="label">
            Nama
          </label>
          <input
            type="text"
            placeholder="Masukan nama anda"
            className="inpZkt"
            name="nama"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nama}
          />
          <label htmlFor="" className="label">
            Jumlah zakat Profesi yang anda bayar
          </label>
          <input
            type="number"
            name="jml_donasi"
            placeholder="Rp. 0"
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.jml_donasi}
            // value={
            //   bulan === 0
            //     ? null
            //     : Math.round(
            //         Math.floor(
            //           (parseInt(bulan) + parseInt(bonus)) / 40 ||
            //             parseInt(bulan) / 40
            //         )
            //       )(
            //         bulan == 0 && bonus == 0
            //           ? setDonasi("")
            //           : Math.round(
            //               Math.floor(
            //                 (parseInt(bulan) + parseInt(bonus)) / 40 ||
            //                   parseInt(bulan) / 40
            //               )
            //             )
            //       )
            // }
            className="inpZkt"
          />
        </div>
        <div className="btn-modal">
          Kenapa harus bayar zakat profesi ?{" "}
          <button onClick={openModal} className="button-modal">
            Klik disini
          </button>
          <div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  border: "1px solid #ccc",
                  background: "#fff",
                  borderRadius: "4px",
                  padding: "20px",
                  width: "40em",
                  height: "35em",
                  overflow: "auto",
                },
              }}
            >
              <div>
                <div className="title-zakat">Zakat Penghasilan / Profesi</div>
                <div className="content-modal">
                  Zakat Penghasilan adalah zakat yang dikeluarkan dari
                  penghasilan bila telah mencapai nishab, zakat ini dikeluarkan
                  setiap kita menerima penghasilan <br />
                  <br /> Salah satu landasannya ada pada Q.S Al-Baqarah ayat 267
                  berikut: <br /> <br />
                  “Wahai orang-orang yang beriman! Infakkanlah sebagian dari
                  hasil usahamu yang baik-baik dan sebagian dari apa yang Kami
                  keluarkan dari bumi untukmu. Janganlah kamu memilih yang buruk
                  untuk kamu keluarkan, padahal kamu sendiri tidak mau
                  mengambilnya melainkan dengan memicingkan mata (enggan)
                  terhadapnya. Dan ketahuilah bahwa Allah Mahakaya, Maha
                  Terpuji.” <br />
                  <br />
                  Nishab zakat penghasilan sebesar 5 wasaq/652,8 kg gabah atau
                  setara 520 kg beras, dengan besaran zakat 2,5% dari
                  penghasilan.
                  <br />
                  <br />
                  Adapun untuk perhitungan zakatnya, ada dua cara:
                  <br />
                  <br /> * Pertama, zakat dihitung dari penghasilan keseluruhan,
                  tanpa dikurangi kebutuhan pokok seperti sandang, pagan dan
                  papan.
                  <br />
                  <br />
                  Maka penghitungan zakatnya adalah: Penghasilan Keseluruhan X
                  2,5% <br />
                  <br />* Kedua, zakat dihitung dari penghasilan setelah
                  dikurangi kebutuhan pokok. Maka penghitungan zakatnya adalah:
                  (Penghasilan Keseluruhan -Pengeluaran Pokok) x 2,5% <br />
                  <br />* Namun untuk menjaga kehati-hatian Zakat sebaiknya
                  dihitung dari penghasilan bruto
                  <br />
                  <br />
                  Sumber : https://www.rumahzakat.org/zakat/zakat-penghasilan/
                </div>
                <br />
              </div>
              <button onClick={closeModal}>Close Modal</button>
            </Modal>
          </div>
        </div>
        <div className="all">Terkumpul : Rp. 32.233.322</div>
        <button className="bayar-zakat" id="bayar">
          BAYAR ZAKAT
        </button>
      </form>
      <div className="donate-center">
        <Collapsible
          trigger={
            <div className="btn-donatur">
              <img src={grup} alt="" className="icon-donatur" />
              <label htmlFor="">Donatur Zakat Profesi ({data.length})</label>
            </div>
          }
        >
          {data &&
            data.map((datas, index) => (
              <div className="card-donatur">
                <img src={user} alt="" className="poto" key={index} />
                <div className="profile">
                  <label htmlFor="">{datas.nama_donatur}</label>
                  <label htmlFor="">Minggu,15 April 2023</label>
                </div>
                <div className="jml-donasi">
                  <div className="done">Rp.{datas.jml_donasi}</div>
                </div>
              </div>
            ))}
        </Collapsible>
      </div>
    </div>
  );
};

export default ZakatProfesi;
