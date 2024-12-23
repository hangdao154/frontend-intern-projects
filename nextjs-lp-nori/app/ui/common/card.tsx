import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import clsx from "clsx";
import Image from "next/image";

interface Props {
    headerImg: string;
    title: string;
    content: string;
    footerImg: string;
    maxWidth?: number;
}

export default function CardComponent(props: Props) {
    const { headerImg, title, content, footerImg, maxWidth } = props;

    let width = "w-auto";
    if (maxWidth) width = `max-w-[${maxWidth}]`

    return (
        <Card className={clsx("bg-white border-[0.5px] border-sky-blue rounded-none shadow-none flex flex-col justify-center items-center w-full", maxWidth && width)}>
            <CardHeader className="pb-3">
                <Image src={headerImg} width={136} height={24} alt="" className="mx-auto" />
                <CardTitle className="text-center text-dark-blue uppercase pt-3">{title}</CardTitle>
            </CardHeader>
            <CardContent >
                <p className="text-center">{content}</p>
            </CardContent>
            <CardFooter>
                <Image src={footerImg} width={206} height={24} alt="" className="mx-auto" />
            </CardFooter>
        </Card>

    )
}