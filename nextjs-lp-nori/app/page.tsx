import Image from "next/image";
import { ivyPrestoTextLight, workSans } from "./ui/fonts";
import LeftRightComponent from "./ui/common/left-right";
import Button from "./ui/common/button";
import Quotes from "./ui/common/quotes";
import CarouselComponent from "./ui/common/carousel";
import ImageSlider from "./ui/common/image-slider";
import CardComponent from "./ui/common/card";
import Hero from "./ui/sections/hero";
import PressReviews from "./ui/sections/press-reviews";
import Product from "./ui/sections/product";
import TestimonialsSection from "./ui/sections/testimonials";
import ProductFeature from "./ui/sections/product-feature";

export default function Home() {
  return (
    <main className={`${workSans.className}`}>
      <Hero />
      <PressReviews />
      <Product />
      <TestimonialsSection />
      <ProductFeature />
      <LeftRightComponent background="beige">
        <div className="py-20">
          <h2 className={`${ivyPrestoTextLight.className} text-center text-dark-blue text-5xl mb-7 capitalize`}>Get your Nori today</h2>
          <p className="text-dark-blue text-center">(Ironing not included)</p>
          <div className="w-fit mx-auto mt-7">
            <Button>Shop the Nori press</Button>
          </div>
        </div>
        <div className="w-full">
          <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/59e40978-get-your-nori-1.jpg" width={800} height={400} alt="" className="w-full" />
        </div>
      </LeftRightComponent>
    </main >
  );
}
