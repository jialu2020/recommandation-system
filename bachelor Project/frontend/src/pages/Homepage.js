import React from 'react';
import Navbar from "../Navbar";
import Slider from 'react-slick';
import './HomepageStyle.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import homepageImage1 from "./e-learning-1280x720.png";
import homepageImage2 from "./puuhgigjgon283.png";
import homepageImage3 from "./WechatIMG4031.jpeg";


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
    <div id="container">
      <Navbar />
      <h1 className="title">About us:</h1>
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
              "IndiLearn" aims to develop a learning system that uses a recommendation system as a tool to provide customized exercises in different subjects based on each student’s performance. The system evaluates the difficulty of the practice questions and the user’s performance and automatically recommends more challenging tasks to reinforce their performance in a particular subject. The goal is to improve the quality of teaching and learning, reduce the teacher’s workload, and increase students’ interest in learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
