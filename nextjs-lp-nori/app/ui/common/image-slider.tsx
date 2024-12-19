'use client'

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

interface Props {
    images: string[]
}

export default function ImageSlider(props: Props) {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState<number>(0);

    return (
        <>
            <div className="w-full h-[466px]">
                {images.map((image, index) => (
                    <div key={index} className={clsx("relative top-0 w-full h-full", currentImage === index ? 'block' : 'hidden')}>
                        <Image src={image} width={530} height={466} alt="" className="absolute h-full object-contain" />
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center gap-2">
                {images.map((image, index) => (
                    <div key={index} onClick={() => setCurrentImage(index)} className={clsx('relative w-[56px] h-[56px]', currentImage === index && 'border-2 border-light-blue')}>
                        <Image src={image} width={100} height={100} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </>
    )
}