import React, { useContext, useEffect, useRef, useState } from "react";
import "./Contact.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { themeContext } from "../../Context";
import axios from "axios";
import swal from "sweetalert";
import { API } from "../../api/route";
const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [response, setResponse] = useState("");
  const http = axios.create({
    baseURL: "https://company.kilauindonesia.org",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });
  const formik = useFormik({
    initialValues: {
      nama: "",
      pesan: "",
      email: "",
    },
    validationSchema: Yup.object({
      nama: Yup.string()
        .max(30, "Maaf nama maximal 30 karakter")
        .required("Form tidak boleh kosong"),
      email: Yup.string()
        .email("Email yang anda masukan tidak valid")
        .required("Form tidak boleh kosong"),
      pesan: Yup.string()
        .max(400, "Maaf pesan maximal 400 karakter karakter")
        .required("Form tidak boleh kosong"),
    }),
    onSubmit: async (values) => {
      const csrf = await http.get("/sanctum/csrf-cookie");
      console.log("csrf =", csrf);
      http
        .post(`${API}/api/messageAjax`, values)
        .then(
          (response) =>
            swal({
              title: "Sukses!",
              text: "Terimakasih sudah sudah memberikan feedback!",
              icon: "success",
            }),
          setResponse(response.data),
          (formik.values.nama = ""),
          (formik.values.email = ""),
          (formik.values.pesan = "")
        )
        .catch((error) => console.error(error));
    },
  });

  return (
    <div className="contact-form" id="contact">
      {/* left side copy and paste from work section */}
      <div className="w-left">
        <div className="awesome">
          {/* darkMode */}
          <span style={{ color: darkMode ? "white" : "" }}>Get in Touch</span>
          <span>Contact me</span>
          <div
            className="blur s-blur1"
            style={{ background: "#ABF1FF94" }}
          ></div>
        </div>
      </div>
      {/* right side form */}
      <div className="c-right">
        <form onSubmit={formik.handleSubmit}>
          {formik.touched.nama && formik.errors.nama ? (
            <div className="validasi">{formik.errors.nama}</div>
          ) : null}
          <input
            type="text"
            name="nama"
            className="user"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nama}
            placeholder="Name"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="validasi">{formik.errors.email}</div>
          ) : null}
          <input
            type="email"
            name="email"
            className="user"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.touched.pesan && formik.errors.pesan ? (
            <div className="validasi">{formik.errors.pesan}</div>
          ) : null}
          <textarea
            name="pesan"
            className="user"
            id="pesan"
            placeholder="Message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pesan}
          />

          <button type="submit" id="send" value="Send" className="button">
            SEND
          </button>
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
