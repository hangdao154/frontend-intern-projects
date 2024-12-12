import { EnumLike } from "zod";
import { Category, Vendor } from "../modules/ecommerce/constants"
interface Props {
    type: EnumLike,
    styles: string,
    action?: (name: string, val: string) => void,
}

export default function DarkSelectComponent(props: Props) {
    const { type, styles, action } = props;
    const options = Object.entries(type);

    const getTitle = () => {
        switch (type) {
            case Category: return "category";
            case Vendor: return "vendor";
        }
    }

    const title = getTitle();


    return (
        <select name={title} className={"dark-style gap-[10px] text-[16px] capitalize " + styles} onChange={(e) => {
            console.log('Name:', e.target.name);
            console.log('Value:', e.target.value);
            action && action(e.target.name, e.target.value)
        }}>
            <option>{title}</option>
            {options.map(([key, val]) => (
                <option key={key}>{val}</option>
            ))}
        </select>
    )
}