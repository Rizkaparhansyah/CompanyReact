import React, { useEffect, useState } from "react";
import Toggle from "../Toggle/Toggle";
import "./Navbar.css";
import { Link } from "react-scroll";
import axios from "axios";
const Navbar = () => {
  // fetch data
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/heroAjax")
      .then((res) => {
        setHeroes(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="n-wrapper" id="Navbar">
      {/* left */}
      <div className="n-left">
        {heroes.map((hero) => (
          <div className="n-name">{hero.name_brand}</div>
        ))}
        <Toggle />
      </div>
      {/* right */}
      <div className="n-right">
        <div className="n-list">
          <ul style={{ listStyleType: "none" }}>
            <li>
              <Link activeClass="active" to="Navbar" spy={true} smooth={true}>
                Home
              </Link>
            </li>
            <li>
              <Link to="category" spy={true} smooth={true}>
                Category
              </Link>
            </li>
            <li>
              <Link to="campign" spy={true} smooth={true}>
                Campign
              </Link>
            </li>
            <li>
              <Link to="services" spy={true} smooth={true}>
                Serivces
              </Link>
            </li>

            <li>
              <Link to="portfolio" spy={true} smooth={true}>
                Program
              </Link>
            </li>
            <li>
              <Link to="testimonial" spy={true} smooth={true}>
                Inspirasi
              </Link>
            </li>
          </ul>
        </div>
        <Link to="contact" spy={true} smooth={true}>
          <button className="button n-button">Contact</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
