import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Hero.css';
import image1 from '../../assets/car1.jpg';
import image2 from '../../assets/car23.jpg';
import image3 from '../../assets/car31.jpg';
import image4 from '../../assets/car4.jpg';


export const Hero = () => {
  return (
    <section id="hero">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        <div>
          <img src={image1} alt="Slide 1" />
          
        </div>
        <div>
          <img src={image2} alt="Slide 2" />
          
        </div>
        <div>
          <img src={image3} alt="Slide 3" />
          
        </div>
        <div>
          <img src={image4} alt="Slide 4" />
          
        </div>
      </Carousel>
    </section>
  );
}

export default Hero;
