import React from "react";
import Campign from "../Campign/Campign";
import Contact from "../Contact/Contact";
import Donasi from "../Donasi/Donasi";
import Footer from "../Footer/Footer";
import Intro from "../Intro/Intro";
import Navbar from "../Navbar/Navbar";
import Portfolio from "../Portfolio/Portfolio";
import Services from "../Services/Services";
import Testimonial from "../Testimonials/Testimonial";
import Zakat from "../Zakat/Zakat";
import FormZakat from "../FORM/Zakat/FormZakat";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Intro />
      <Zakat />
      <Campign />
      <Services />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
