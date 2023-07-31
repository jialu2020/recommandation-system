import React from 'react';
import Navbar from "../Navbar";
import Slider from 'react-slick';
import './HomepageStyle.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import homepageImage1 from "../icons/Indilearn-logo.png";
import homepageImage2 from "../icons/puuhgigjgon283.png";
import homepageImage3 from "../icons/WechatIMG4031.jpeg";
import Footer from "../footer";


export default function Homepage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <Navbar />

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <h1 className="title">Über uns:</h1>
        <div>
          <h2 className="second_title">
            IndiLearn: Individualized Exercise Selection in a Web-based Learning Platform using an IRT-based Recommender System
          </h2>
          <div className="box">
            <div className="left">
              <Slider {...settings}>
                <div>
                  <img className="homepage-image" src={homepageImage1} alt="image 1" />
                </div>
                <div>
                  <img className="homepage-image" src={homepageImage2} alt="image 2" />
                </div>
                <div>
                  <img className="homepage-image" src={homepageImage3} alt="image 1" />
                </div>
              </Slider>
            </div>
            <div className="right">
              <p className="description">
              "IndiLearn" ist ein Lernsystem, das ein Empfehlungssystem verwendet, um maßgeschneiderte Übungen in einem Fach auf der Grundlage der Leistung jedes Schülers bereitzustellen. Das System bewertet die Schwierigkeit der Übungsaufgaben und die Leistung des Benutzers und empfiehlt automatisch anspruchsvollere Aufgaben, um ihre Leistung in einem bestimmten Fach zu stärken. Das Ziel besteht darin, die Qualität von Unterricht und Lernen zu verbessern, die Arbeitsbelastung der Lehrer zu reduzieren und das Interesse der Schüler am Lernen zu steigern.
              </p>
            </div>
          </div>
        </div>


      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
