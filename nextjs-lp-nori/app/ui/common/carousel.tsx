import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image';
import CardComponent from './card';

interface CarouselProps {
    testimonials: {
        headerImg: string;
        title: string;
        content: string;
        footerImg: string;
    }[]
}

export default function CarouselComponent(props: CarouselProps) {
    const { testimonials } = props;

    return (
        <Carousel>
            <CarouselContent>
                {testimonials.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <CardComponent {...item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}