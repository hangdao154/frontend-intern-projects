import Image from "next/image";
import LeftRightComponent from "../common/left-right";
import Button from "../common/button";
import { ivyPrestoTextLight } from "../fonts";

export default function Hero() {
    return (
        <section className="bg-beige">
            <LeftRightComponent background="beige">
                <div className="ml-[30%] mr-14 my-14 flex flex-col gap-10">
                    <h1 className={`${ivyPrestoTextLight.className} text-dark-blue text-5xl`}>Meet the Nori Press,<br />Ironing Made Easy.</h1>
                    <div className="text-dark-blue text-2xl font-[600]">Time to Say GOODBYE to...</div>
                    <ul className="list-none flex flex-col gap-4">
                        <li>
                            <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/f392aa18-group-2545.svg" width={32} height={32} alt="" className="inline" />
                            <p className="inline ml-2 text-dark-blue text-md leading-tight">Clunky Ironing Boards</p>
                        </li>
                        <li>
                            <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/a4ea66c1-group-2546.svg" width={32} height={32} alt="" className="inline" />
                            <p className="inline ml-2 text-dark-blue text-md leading-tight">Leaky Steamers</p>
                        </li>
                        <li>
                            <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/25ec5eed-group-2547.svg" width={32} height={32} alt="" className="inline" />
                            <p className="inline ml-2 text-dark-blue text-md leading-tight">Expensive Dry Cleaning</p>
                        </li>
                    </ul>
                    <Button>PICK MY PRESS + GET 20% OFF</Button>
                </div>

                <div className="w-full h-full">
                    <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/e450d805-nori-launch19130-2.jpg" width={960} height={554} alt="An image of the product steamer"
                        className="h-full object-cover" />
                </div>
            </LeftRightComponent>
        </section>
    )
}