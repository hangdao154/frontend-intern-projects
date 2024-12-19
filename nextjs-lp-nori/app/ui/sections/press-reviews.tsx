import Image from "next/image";
import Quotes from "../common/quotes";

const PRESS_REVIEWS = [
    {
        content: "An iron that doesn’t require an ironing board and doubles as a steamer. An absolute game-changer",
        img: "https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/487111d3-forbes-nori.svg"
    },
    {
        content: "The Handheld Steam Iron the Internet Won’t Stop Talking About",
        img: "https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/ab27c886-d-post-nori_107o00o000000000000000.png"
    },
    {
        content: "If you've ever felt like your clothes steamer just isn't cutting it, The Nori Press is the solution",
        img: "https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/7446b249-town-nori_105o00w000000000000000.png"
    }
]

export default function PressReviews() {
    return (
        <section className="bg-sky-blue-pale">
            <div className="bg-sky-blue-pale mx-[15%] py-14">
                <Image src="https://d9hhrg4mnvzow.cloudfront.net/get.nori.co/nori-lp-1/35f742f9-press-stars.svg" width={465} height={28} alt="More than 15,000 happy customers"
                    className="mx-auto mb-7" />
                <div className="flex justify-between items-stretch gap-14">
                    {PRESS_REVIEWS.map((review, index) => (
                        <Quotes key={index} content={review.content} img={review.img} />
                    ))}
                </div>
            </div>
        </section>
    )
}