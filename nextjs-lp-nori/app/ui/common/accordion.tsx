import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { workSans } from "../fonts"

interface Props {
    accordions: {
        title: string;
        content: string[]
    }[]
}

export function AccordionComponent(props: Props) {
    const { accordions } = props;

    return (
        <Accordion type="single" collapsible className="w-full">
            {accordions.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-dark-blue uppercase tracking-wide">{item.title}</AccordionTrigger>
                    <AccordionContent className="text-dark-blue text-md">
                        <ul className="list-disc">
                            {item.content.map((contentItem, index2) => (
                                <li key={index2}>{contentItem}</li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
