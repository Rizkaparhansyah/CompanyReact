import Collapsible from "react-collapsible";
import "./FormZakat.css";
import grup from "../../../img/grupdonate.png";
import user from "../../../img/user.png";
import Modal from "react-modal";
import { useRef, useState } from "react";
import { useEffect } from "react";
import swal from "sweetalert";
import ZakatProfesi from "../ZakatProfesi";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { API } from "../../../api/route";

Modal.setAppElement("#root");
const FormZakat = (props) => {
 
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
  const [zakat, setZakat] = useState();
  const [kon, setKon] = useState();
  const categories = ['PROFESI', 'PERDAGANGAN', 'SIMPANAN', 'EMAS'];
  const [selected, setSelected] = useState(null);
  const [triger, setTrigger] = useState(false);

  const formik = useFormik({
    initialValues: {
      tipe_zakat: 'PROFESI',
      nominal: 0,
      nama_donatur: "Anonymous",
      nik: null,
      id: null,
    },
    onSubmit: async (values) => {
      const response = await axios.post(`${API}/api/payment/`, values);
        // setTrigger(true)
        
        const snapToken = response.data.token;
        console.log('Response:',snapToken);

      window.snap.pay(snapToken, {
        onSuccess: function (result) {
          alert('Pembayaran berhasil!');
          checkTransactionStatus(result);
        },
        onPending: function (result) {
          alert('Menunggu pembayaran...');
          checkTransactionStatus(result);
        },
        onError: function (result) {
          alert('Pembayaran gagal!');
          checkTransactionStatus(result);
        },
        onClose: function () {
          alert('Kamu belum menyelesaikan pembayaran!');
        }
      });
    },
  });


  const handleClick = (index, val) => {
    console.log('val', val)
    setSelected(index);
    formik.setFieldValue('tipe_zakat', val);
  };
  useEffect(() => {
    axios
      .get(`${API}/api/zakatAjax`) // Ganti URL sesuai dengan API Anda
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [triger]);
const checkTransactionStatus = async (data) => {
  setTrigger(!triger)
  try {
    const response = await axios.post(`${API}/api/payment/notification`, data);
    return response;
  } catch (error) {
    console.error("Gagal cek status:", error);
  }
};

  const handleError = () => {
    if (zakat == null) {
    }
  };

  return (
    <div className="conta">
      <div className="_card">
        <form onSubmit={formik.handleSubmit}>
          <div className="judul">ZAKAT</div>
          <div className="underline"></div>
          <div className="category-zakat">
             {categories.map((category, index) => (
            <div
              key={index}
              className={`pick-category ${selected === index ? 'active' : ''}`}
              onClick={() => handleClick(index, category)}
            >
              {category}
            </div>
          ))}
          
          </div>

          {/* <Collapsible
            trigger={
              <div className="label-c ">
                <label htmlFor="" className="kalkulate">
                  Silahkan masukan jumlah zakat anda, atau hitung dengan{" "}
                  <label htmlFor="" id="kalkulate">
                    Klik Disini
                  </label>
                </label>
              </div>
            }
          >
            <div className="kal ">
              <div className="card-kal">
                <label htmlFor="">Pendapatan Perbulan (wajib di isi)</label>
                <input
                  type="number"
                  id="bulanan"
                  noSpin
                  onChange={handleBulanan}
                />
              </div>
              <div className="card-kal">
                <label htmlFor="" id="bonus">
                  Bonus, THR Lainnya (jika ada)
                </label>
                <input type="number" noSpin onChange={handleBonus} />
              </div>
            </div>
          </Collapsible> */}
          <div className="input-zakat ">
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
              name="nama_donatur"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nama_donatur}
            />
            <label htmlFor="" className="label">
              Jumlah zakat Profesi yang anda bayar
            </label>
            <input
              type="number"
              name="nominal"
              placeholder="Rp. 0"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nominal}
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
          <div className="btn-modal ml">
            Kenapa harus bayar zakat profesi
            <input
              type=""
              onClick={openModal}
              className="button-modal"
              value={"Klik disini"}
            />
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
                    penghasilan bila telah mencapai nishab, zakat ini
                    dikeluarkan setiap kita menerima penghasilan <br />
                    <br /> Salah satu landasannya ada pada Q.S Al-Baqarah ayat
                    267 berikut: <br /> <br />
                    “Wahai orang-orang yang beriman! Infakkanlah sebagian dari
                    hasil usahamu yang baik-baik dan sebagian dari apa yang Kami
                    keluarkan dari bumi untukmu. Janganlah kamu memilih yang
                    buruk untuk kamu keluarkan, padahal kamu sendiri tidak mau
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
                    <br /> * Pertama, zakat dihitung dari penghasilan
                    keseluruhan, tanpa dikurangi kebutuhan pokok seperti
                    sandang, pagan dan papan.
                    <br />
                    <br />
                    Maka penghitungan zakatnya adalah: Penghasilan Keseluruhan X
                    2,5% <br />
                    <br />* Kedua, zakat dihitung dari penghasilan setelah
                    dikurangi kebutuhan pokok. Maka penghitungan zakatnya
                    adalah: (Penghasilan Keseluruhan -Pengeluaran Pokok) x 2,5%{" "}
                    <br />
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
          {/* <div className="all ml">Terkumpul : Rp. 32.233.322</div> */}
          <button className="bayar-zakat ml" onClick={handleError} id="bayar">
            BAYAR ZAKAT
          </button>
        </form>
        <div className="donate-center">
          <Collapsible
            trigger={
              <div className="btn-donatur">
                <img src={grup} alt="" className="icon-donatur" />
                <label htmlFor="">Donatur Zakat ({data?.length}) </label>
              </div>
            }
          >
            {data &&
              data.map((datas, i) => (
                <div className="card-donatur" key={i}>
                  <img src={user} alt="" className="poto" />
                  <div className="profile">
                    <label htmlFor="">{datas.nama_donatur} - {datas.tipe_zakat} </label>
                    <label htmlFor="">
                      {new Date(datas.created_at).getDate()}
                      
                      {"-"}
                      {new Date(datas.created_at).getMonth() + 1}
                      {"-"}
                      {new Date(datas.created_at).getFullYear()}
                    </label>
                  </div>
                  <div className="jml-donasi">
                    <div className="done">Rp.{datas.nominal}</div>
                  </div>
                </div>
              ))}
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default FormZakat;
