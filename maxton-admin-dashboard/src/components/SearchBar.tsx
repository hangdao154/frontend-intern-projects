import { useState } from "react";
import { GetProductQueries } from "../lib/interfaces";

interface Props {
    rounded: string,
    onSearch: (name: string, val: string) => void;
    placeholder: string,
}

export default function SearchBar(props: Props) {
    const { rounded, onSearch, placeholder } = props;
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch("keyword", inputValue.trim()); // Trigger the callback with the search keyword
            setInputValue(""); // Clear the input field after search
        }
    };

    return (
        <div className="search-bar flex-1 relative">
            <input
                style={{ paddingLeft: "58px", paddingRight: "58px", minWidth: "150px" }} 
                className={"dark-style w-full " + rounded} placeholder={placeholder} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={handleKeyPress} />
            <span className="material-symbols-outlined text-[30px] text-white absolute top-[6px] left-[16px]">search</span>
        </div>
    )
}