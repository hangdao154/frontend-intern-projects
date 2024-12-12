import Image from "next/image"
import pic from './image.png'   //Local images

export default function Page() {
    return (
        <>
            <Image src={pic} alt="" />
            <h1>Hello, Blog Post Page!</h1>
        </>
    )
}