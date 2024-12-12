interface Props {
    totalPages: number,
    currentPage: number,
    handleChangePage: (name: string, page: number | undefined) => void,
}

export default function PageNav(props: Props) {
    const { totalPages, currentPage, handleChangePage } = props;
    const pageArr = [];

    // Displaying page number based on number of pages and current page
    if (totalPages < 4) {
        for (let i = 1; i <= totalPages; i++) {
            pageArr.push(i);
        }
    } else if (totalPages >= 4 && totalPages - currentPage > 3) {
        pageArr.push(currentPage);
        pageArr.push(currentPage + 1);
        pageArr.push(currentPage + 2);
        pageArr.push("...");
        pageArr.push(totalPages);
    } else if (totalPages >= 4 && totalPages - currentPage <= 3) {
        pageArr.push(totalPages - 3);
        pageArr.push(totalPages - 2);
        pageArr.push(totalPages - 1);
        pageArr.push(totalPages);
    }

    const getPreviousPage = (currentPage: number) => {
        if (currentPage > 1) return (currentPage - 1);
        return currentPage;
    }

    const getNextPage = (currentPage: number, totalPages: number) => {
        if (currentPage < totalPages) return (currentPage + 1);
        return currentPage;
    }


    return (
        <>
            <div className="page-nav flex justify-center gap-[20px] items-center">
                <button className="material-symbols-outlined opacity-[70%] text-center rounded-[50%] w-[34px] h-[34px] hover:bg-[#00000070]" onClick={() => handleChangePage("page", getPreviousPage(currentPage))}>
                    arrow_back_ios
                </button>

                <ul className="page-num flex gap-[20px] justify-center items-center">
                    {pageArr.map(page => (
                        <li key={page}>
                            <button
                                className={(typeof (page) === 'number' ? (page === currentPage ? "dark-selected" : "hover:bg-[#00000030]") : "") + " w-[34px] h-[34px] rounded-lg flex justify-center items-center text-[12px]"}
                                onClick={() => {
                                    if (typeof (page) === "number") {
                                        handleChangePage("page", page);
                                    }
                                }}>{page}
                            </button>
                        </li>
                    ))}
                </ul>

                <button className="material-symbols-outlined opacity-[70%] rounded-[50%] w-[34px] h-[34px] hover:bg-[#00000070]" onClick={() => handleChangePage("page", getNextPage(currentPage, totalPages))}>
                    arrow_forward_ios
                </button>
            </div>
        </>

    );
}