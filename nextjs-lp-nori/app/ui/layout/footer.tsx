import Image from "next/image";
import { workSans } from "../fonts";

export default function Footer() {
    return (
        <footer className={`${workSans.className} bg-dark-blue text-white text-center py-16`}>
            <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/8604061c-nori-logo.svg" width={192} height={58} alt="White Nori logo" 
            className="mx-auto"/>
            <div className="flex justify-center gap-7 mt-12 text-white text-center text-md">
                <span>Privacy Policy</span>
                <span>Terms of Use</span>
            </div>
            <p className="text-white text-center text-md mt-3">© 2022 Nori, Inc. All Rights Reserved.</p>
        </footer>
    )
}