import Image from "next/image";
import LeftRightComponent from "../common/left-right";
import Button from "../common/button";
import { ivyPrestoTextLight } from "../fonts";
import CarouselComponent from "../common/carousel";

const FEEDBACKS = [
    {
        headerImg: "https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/d3c87923-before-stars.svg",
        title: "The Nori Press is the best",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi eaque cupiditate repudiandae deserunt similique dicta vitae, minus, officia ullam neque perspiciatis expedita officiis mollitia provident quod. Maiores quo porro iusto!",
        footerImg: "https://user-assets-unbounce-com.s3.amazonaws.com/bfb5aac3-dc03-4381-88d5-768d4b76b744/1d4109f1-13be-4f19-bc27-212f73056b40/callie.original.svg"
    },
    {
        headerImg: "https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/d3c87923-before-stars.svg",
        title: "The Nori Press is the best",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi eaque cupiditate repudiandae deserunt similique dicta vitae, minus, officia ullam neque perspiciatis expedita officiis mollitia provident quod. Maiores quo porro iusto!",
        footerImg: "https://user-assets-unbounce-com.s3.amazonaws.com/bfb5aac3-dc03-4381-88d5-768d4b76b744/1d4109f1-13be-4f19-bc27-212f73056b40/callie.original.svg"
    }, {
        headerImg: "https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/d3c87923-before-stars.svg",
        title: "The Nori Press is the best",
        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi eaque cupiditate repudiandae deserunt similique dicta vitae, minus, officia ullam neque perspiciatis expedita officiis mollitia provident quod. Maiores quo porro iusto!",
        footerImg: "https://user-assets-unbounce-com.s3.amazonaws.com/bfb5aac3-dc03-4381-88d5-768d4b76b744/1d4109f1-13be-4f19-bc27-212f73056b40/callie.original.svg"
    }
];

export default function ProductFeature() {
    return (
        <section className="bg-beige">
            {/* Product Features */}
            <div className="mx-[15%] py-20">
                <LeftRightComponent>
                    <div className="relative h-full pr-8">
                        <h2 className={`${ivyPrestoTextLight.className} text-5xl text-center text-dark-blue`}>So You Have One Less Wrinkle to Worry About</h2>
                        <div className="mt-14">
                            <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/210243d6-table-img.jpg" width={530} height={328} alt="" className="w-full h-full" />
                        </div>
                    </div>
                    <div className="pl-8 h-full flex flex-col justify-between">
                        <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/6d6b8816-table.png" width={530} height={408} alt="" />
                        <Button>PICK MY PRESS</Button>
                    </div>
                </LeftRightComponent>
            </div>

            {/* Product Details */}
            <div className="bg-gradient-to-b from-slate-200/20 to-sky-blue-pale">
                <h2 className={`${ivyPrestoTextLight.className} text-5xl text-center text-dark-blue pt-14 mb-[200]`}>We've Thought Of Everything</h2>
                {/* <div>
                    <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/1e693c3d-nori-launch18607-4-1.png" width={1258} height={367} alt=""
                        className="absolute bottom-0 right-0 w-[90%] object-contain" />
                </div>
                <div className="absolute bottom-[45px] right-[310px]">
                    <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/c48199c6-group-2610.svg" width={930} height={547} alt="" />
                </div> */}
                {/* <div className="relative mt-[200px] h-[640px]">
                    <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/1e693c3d-nori-launch18607-4-1.png" width={1258} height={367} alt=""
                        className="absolute z-0 bottom-0 right-0 w-[90%] border border-black" />
                    <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/c48199c6-group-2610.svg" width={930} height={547} alt=""
                        className="relative bottom-[160] mx-auto mb-auto w-[70%] border border-black" />
                </div> */}
                <div className="relative w-[1536px] ml-auto">
                    <Image
                        src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/1e693c3d-nori-launch18607-4-1.png"
                        alt="Iron"
                        layout="responsive"
                        width={1920}
                        height={1080}
                    />
                    <div className="absolute top-[-100] left-[-180] w-full h-full flex items-center justify-center">
                        <Image
                            src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/c48199c6-group-2610.svg"
                            alt="Details"
                            className="w-full max-w-[70%]"
                            layout="responsive"
                            width={1920}
                            height={1080}
                        />
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-slate-200 p-14">
                <h2 className={`${ivyPrestoTextLight.className} text-center text-dark-blue text-5xl mb-7`}>Everyone Agrees This Iron is Hot</h2>
                <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/35f742f9-press-stars.svg" width={465} height={28} alt="" className="mx-auto mb-14" />
                <div className="px-[300px]">
                    <CarouselComponent testimonials={FEEDBACKS} />
                    <div className="mx-auto mt-7 w-fit"><Button>Shop Nori Press</Button></div>
                </div>
            </div>

            {/* QnA */}
            <div className="bg-white">
                <LeftRightComponent>
                    <div className="bg-[#5a87c6] relative w-full">
                        <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/d219c130-nori-press-best-steam-iron-wrinkle-remover-for-clothes-27-2.png" width={800} height={400} alt="" />
                        <h2 className={`${ivyPrestoTextLight.className} text-white text-5xl text-center py-20 capitalize pl-14 pr-20`}>Let' iron out <br /> the details</h2>
                        <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/f03f763f-nori-mess.svg" width={400} height={400} alt="" />
                    </div>
                    <div className="pl-14 pr-[30%] py-14 w-full">
                        <ul className="list-none flex flex-col gap-4">
                            <li>
                                <h3 className="text-dark-blue text-2xl font-[500]">Can it reach the garment?</h3>
                                <p className="text-dark-blue">The device is 14 inches in length and designed to reach across most garments.</p>
                                <hr className="border-[0.5px] border-dark-blue my-4" />
                            </li>
                            <li>
                                <h3 className="text-dark-blue text-2xl font-[500]">Can it reach the garment?</h3>
                                <p className="text-dark-blue">The device is 14 inches in length and designed to reach across most garments.</p>
                                <hr className="border-[0.5px] border-dark-blue my-4" />
                            </li>
                            <li>
                                <h3 className="text-dark-blue text-2xl font-[500]">Can it reach the garment?</h3>
                                <p className="text-dark-blue">The device is 14 inches in length and designed to reach across most garments.</p>
                            </li>
                        </ul>
                    </div>
                </LeftRightComponent>
            </div>
        </section>
    )
}