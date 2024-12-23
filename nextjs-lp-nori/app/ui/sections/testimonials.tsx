import Image from "next/image";
import LeftRightComponent from "../common/left-right";
import CardComponent from "../common/card";

export default function TestimonialsSection() {
    return (
        <section>
            <div className="bg-beige px-[15%]">
                <LeftRightComponent>
                    <div className="py-20 pr-14">
                        <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/fd3d6ada-group-2562.jpg" width="530" height="392" alt="" className="ml-auto" />
                    </div>
                    <div className="py-20">
                        <CardComponent
                            headerImg="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/d3c87923-before-stars.svg"
                            title="BYE BYE IRONING BOARD"
                            content="I hate wrinkled clothing, but I also hate dragging out the massive clunky ironing board. The Nori Press saves me so much time and space in my tiny LA apartment."
                            footerImg="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/b43e487f-samantha.svg"
                        />
                    </div>
                </LeftRightComponent>
            </div>
            <div className="bg-white px-[15%]">
                <LeftRightComponent>
                    <div className="py-20 pr-14">
                        <CardComponent
                            headerImg="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/d3c87923-before-stars.svg"
                            title="BYE BYE IRONING BOARD"
                            content="I hate wrinkled clothing, but I also hate dragging out the massive clunky ironing board. The Nori Press saves me so much time and space in my tiny LA apartment."
                            footerImg="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/b43e487f-samantha.svg"
                        />
                    </div>
                    <div className="py-20">
                        <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/07280c86-before2-desk-1.jpg" width="530" height="392" alt="" />
                    </div>
                </LeftRightComponent>
            </div>
        </section>
    )
}