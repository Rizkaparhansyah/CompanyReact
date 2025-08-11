import "../Donasi/Donasi.css";
import img from "../../img/BT-LOGO.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { QRCodeCanvas } from "qrcode.react";
import { API } from "../../api/route";

const Donasi = () => {
  const [trigger, setTrigger] = useState(false);
  const [inp, setInp] = useState(0);
  const [name, handleName] = useState("Anonymouse");
  // get id
  const sId = window.location.pathname;
  let newId = sId.split("/")[2];
  const [datas, setData] = useState();
  const [test, setTest] = useState();

  // get data
  

  useEffect(()=>{
    fetch(`${API}/api/campignAjax/${newId}/edit`)
          .then((response) => response.json())
          .then((data) => {
            setTest(data.result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  },[trigger])
  function handleData({ target }) {
    setData(target.value);
  }
  function handleInp({ target }) {
    console.log('target.value', target.value)
    setInp(target.value);
  }

const checkTransactionStatus = async (data) => {
  try {
    const response = await axios.post(`${API}/api/payment/notification`, data);
    setTrigger(response)
    return response;
  } catch (error) {
    console.error("Gagal cek status:", error);
  }
};


const handlePay = async (e) => {
    // e.preventDefault();

    try {
      const terkumpul = parseInt(test.terkumpul) + parseInt(datas);
    const put = parseInt(test.terkumpul) + parseInt(isNaN(inp) ?? 0);
    // console.log('put', name.target.value)
    // console.log('put', terkumpul)
    axios.defaults.withCredentials = true;

    const response = await axios.post(`${API}/api/payment`, {
          terkumpul: terkumpul ? terkumpul : put,
          nominal: parseInt(datas) || parseInt(inp),
          nama_donatur: name,
          id: newId,
        });
        setTrigger(true)
        
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
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Gagal membuat transaksi.');
    }
  };

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
    <div className="cont">
      <div className="__card-1">
        <img src={img} alt="" />
        <div className="grid-text">
          <div className="desk" id="pro">{test?.keluhan}</div>
          <div className="desk" id="tes">Terkumpul: {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(test?.terkumpul)}</div>
        </div>
      </div>
      {/* <form onSubmit={formik.handleSubmit}> */}
        <div className="__card-2">
          <Link to="/">
            <div className="back">Kembali</div>
          </Link>
          <div className="pilih-donasi">
            <p className="text">Nama</p>
            {/* <div className="btn-price"> */}
               <input
                  onChange={e => handleName(e.target.value)}
                  // type="number"
                  className="btn-price-solo"
                  placeholder="Kosongkan bila anonym"
                />
            {/* </div> */}
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
            {/* <img
              src="	https://berbagibahagia.org/gambarUpload/gopay.png"
              alt=""
              width={250}
            />

            <div className="payment">
              <div className="scan">SCAN HERE</div>
              <div className="qrcode">{qrcode}</div>
            </div> */}
            <button className="button-bayar" onClick={ () =>
handlePay()}>
              DONASI
            </button>
          </div>
        </div>
      {/* </form> */}
    </div>
  );
};

export default Donasi;
