import Image from "next/image";

interface Props {
    content: string;
    img: string;
}

export default function Quotes(props: Props) {
    const { content, img } = props;

    return (
        <div className="w-1/3 flex flex-col justify-center items-center text-dark-blue py-3">
            <p className="text-center my-auto">“{content}”</p>
            <div className="mt-7 h-[36px]">
                <Image src={img} height={36} width={140} alt="" className="h-full object-contain" />
            </div>
        </div>
    )
}