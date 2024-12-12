import { EnumLike } from "zod";
import DarkSelectComponent from "../../../components/DarkSelectComponent";
import SearchBar from "../../../components/SearchBar";
import DarkButton from "../../../components/buttons/DarkButton";
import FilledButton from "../../../components/buttons/FilledButton";

interface Props {
    selectTypes: EnumLike[],
    handleSetFilter: (name: string, value: any) => void
}

export default function FilterGroup(props: Props) {
    const { selectTypes, handleSetFilter } = props;

    return (
        <div className="flex flex-wrap justify-between">
            <div className="left flex flex-wrap items-center mt-[24px]">
                <SearchBar rounded="rounded-lg" onSearch={handleSetFilter} placeholder="Search products" />

                <div className="btn-group">
                    {selectTypes.map((type, index) =>
                        <DarkSelectComponent key={index} type={type} styles={
                            (index === 0
                                ? "rounded-l-lg"
                                : (index === selectTypes.length - 1 ? "rounded-r-lg" : "")
                            )} action={handleSetFilter} />
                    )}
                </div>
            </div>

            <div className="right flex items-center mt-[24px]">
                <DarkButton content="Export" iconL="exit_to_app" otherStyles="rounded-lg" onClick={() => { }} />
                <a href="/add-product">
                    <FilledButton content="Add Product" iconL="add" active={true} otherStyle="bg-primary-blue" />
                </a>
            </div>
        </div>
    )
}