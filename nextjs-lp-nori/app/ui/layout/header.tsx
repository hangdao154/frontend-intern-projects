import Image from "next/image";
import Button from "../common/button";
import { workSans } from "../../../app/ui/fonts";

export default function Header() {
    return (
        <header className="w-full relative text-sm">
            <div className={`${workSans.className} bg-light-blue text-center py-1 text-white`}>Exclusive Offer: Use code <b>PRESS20</b> for <b>20% off</b> your order</div>
            <div className="flex justify-between items-center px-[15%] py-3 bg-white border-b border-black">
                <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/6bab2959-nori-logo.svg" width={106} height={32} alt="Nori Logo" />
                <div>
                    <Button>SHOP NOW</Button>
                </div>
            </div>
        </header>
    )
}