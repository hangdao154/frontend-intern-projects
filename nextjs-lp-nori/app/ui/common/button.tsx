import { workSans } from "../../../app/ui/fonts";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

export default function Button(props: ButtonProps) {
    const { children, onClick } = props;

    return (
        <button onClick={onClick} className={`${workSans.className} bg-dark-blue uppercase text-white text-sm py-[10px] px-[20px] w-full border border-dark-blue hover:bg-[#00000000] hover:text-dark-blue`}>
            {children}
        </button>
    )
}