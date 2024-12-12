import PageLimitSelector from "./PageLimitSelector";
import PageNav from "./PageNav";

interface Props {
    handleSetFilter: (name: string, value: any) => void,
    totalPages: number,
    currentPage: number,
}

export default function Pagination(props: Props) {
    const { handleSetFilter, totalPages, currentPage } = props;

    return (
        <div className="mt-[24px] flex justify-between items-center">
            <PageLimitSelector handleChangeLimit={handleSetFilter} />
            <PageNav totalPages={totalPages} currentPage={currentPage} handleChangePage={handleSetFilter} />
        </div>
    )
}