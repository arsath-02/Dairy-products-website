import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Hero.css';
import image1 from '../../assets/c1.jpeg';
import image2 from '../../assets/image2.jpeg';
import image3 from '../../assets/image3.jpeg';

export const Hero = () => {
  return (
    <section id="hero">
      <Carousel showThumbs={false} autoPlay infiniteLoop>
        <div>
          <img src={image1} alt="Slide 1" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={image2} alt="Slide 2" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={image3} alt="Slide 3" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </section>
  );
}

export default Hero;
