import Image from "next/image";
import ImageSlider from "../common/image-slider";
import LeftRightComponent from "../common/left-right";
import Button from "../common/button";
import CardComponent from "../common/card";
import { ivyPrestoTextLight } from "../fonts";

const PRODUCTS_CAROUSEL = [
    'https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/f5b0496f-big1.jpg',
    'https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/03dc5414-big3.jpg',
    'https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/54f71f66-big4.jpg',
    'https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/9eeabddc-big5-1.jpg',
    'https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/b32eb6ab-big6.jpg'
]

const COLORS = [
    'white',
    'black',
    'pink',
    'blue'
]

export default function Product() {
    return (
        <section className="bg-white">
            <LeftRightComponent>
                <div className="py-20 ml-[30%] mr-14 h-full flex flex-col justify-start">
                    <ImageSlider images={PRODUCTS_CAROUSEL} />
                </div>
                <div className="py-20 mr-[30%]">
                    <h2 className={`${ivyPrestoTextLight.className} text-dark-blue text-5xl mb-4`}>Nori Press</h2>
                    <p className="text-dark-blue mb-8">Our premier wrinkle-removal product designed to press, steam and refresh your clothes with ease. Check it out in action in our
                        How to Use section.</p>
                    <div className="text-dark-blue">
                        <p className="mb-2">
                            <span className="font-[600]">CHOOSE YOUR COLOR: </span>
                            <span>White</span>
                        </p>
                        <ul className="list-none flex justify-start gap-4 mb-8">
                            {COLORS.map(color => (
                                <li key={color} className={`bg-slate-600 rounded-full w-[30px] h-[30px]`}></li>
                            ))}
                        </ul>
                    </div>
                    <Button><b>SAVE 20% NOW</b></Button>
                    <div className="flex justify-center items-center gap-2 mt-2 mb-8">
                        <span>or 4 interest-free payments of $24 with</span>
                        <span><Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/e45a6f31-img.svg" width={55} height={15} alt="" className="inline" /></span>
                    </div>
                    <CardComponent
                        headerImg="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/d3c87923-before-stars.svg"
                        title="Works like a charm"
                        content="I'm a teacher and I use my Nori at least three times a week on my work pants! It is so easy to use and I love that I don't have to take out my clunky ironing board. Highly recommend!"
                        footerImg="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/ed6d60d5-group-2480.svg"
                    />
                    <div className="bg-slate-200 p-3 mt-8">
                        <ul className="flex justify-between items-center gap-4">
                            <li className="flex gap-2">
                                <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/f392aa18-group-2545.svg" width={32} height={32} alt="" className="inline" />
                                <p className="inline ml-2 text-dark-blue text-md leading-tight">No more boards</p>
                            </li>
                            <li className="flex gap-2">
                                <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/a4ea66c1-group-2546.svg" width={32} height={32} alt="" className="inline" />
                                <p className="inline ml-2 text-dark-blue text-md leading-tight">No more leakage</p>
                            </li>
                            <li className="flex gap-2">
                                <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/25ec5eed-group-2547.svg" width={32} height={32} alt="" className="inline" />
                                <p className="inline ml-2 text-dark-blue text-md leading-tight">No more Dry-Cleaning</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </LeftRightComponent>
        </section>
    )
}