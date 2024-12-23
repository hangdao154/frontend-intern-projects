'use client';

import CardComponent from './card';
import React from "react";
import Slider, { Settings } from "@ant-design/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  testimonials: {
    headerImg: string;
    title: string;
    content: string;
    footerImg: string;
  }[]
}

export default function CarouselComponent(props: CarouselProps) {
  const { testimonials } = props;
  // const settings: Partial<Settings> = {
    //   className: "center",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "0",
  //   slidesToShow: 3,
  //   speed: 500,
  // };
  var settings = {
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (currentIndex: number) => {
      // Select the element with the class 'slick-track'
      var element = document.querySelector('.slick-track') as HTMLElement;
      var currentSlide = element.children[currentIndex] as HTMLElement;

      // Get the current transform value
      var currentTransform = getComputedStyle(element).transform;
      var currentSlideWidth = currentSlide.clientWidth;

      // Extract the x translation value. The match function attempts to find the numbers in the matrix transform, which are separated by commas.
      // The matrix format is matrix(a, b, c, d, tx, ty) where tx is our x translation.
      // If the transform is in the translate3d format, it should still match correctly.
      var match = currentTransform.match(/matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/);

      if (match) {
        var currentX = parseFloat(match[5]); // Get the x translation value

        // Calculate the new x value by adding 45
        var newX = currentX + currentSlideWidth;

        // Set the new transform value
        element.style.transform = 'translate3d(' + newX + 'px, 0px, 0px)';
      } else {
        console.log("Could not parse the current transform value.");
      }
    },
    initialSlide: 0,
  };

  return (
    // <div className="slider-container">
    //   <Slider {...settings}>
    //     {testimonials.map((item, index) => (
    //       <div className='bg-white'>
    //         {item.content}
    //       </div>
    //     ))}
    //   </Slider>
    // </div>
    <Slider {...settings}>
      {/* <div className='bg-white'>
        <h3>1</h3>
      </div>
      <div className='bg-white'>
        <h3>2</h3>
      </div>
      <div className='bg-white'>
        <h3>3</h3>
      </div>
      <div className='bg-white'>
        <h3>4</h3>
      </div>
      <div className='bg-white'>
        <h3>5</h3>
      </div>
      <div className='bg-white'>
        <h3>6</h3>
      </div> */}
      {testimonials.map((item, index) => (
        <div key={index}>
          <CardComponent {...item} />
        </div>
      ))}
    </Slider>
  )
}