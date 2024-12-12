import React, { useState, useEffect } from 'react';

export default function PageNav(props) {
    const { totalPages, currentPage, handleChangePage, handleNextPage, handlePreviousPage } = props;
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

    return (
        <>
            <div className="page-nav">
                <img className="xs-icon" src="public/prev-icon.png" onClick={handlePreviousPage} />

                <ul className="page-num">
                    {pageArr.map(page => (
                        <li key={page} className={page === currentPage ? "selected-page" : ""} onClick={() => {
                            handleChangePage(page);
                        }}>{page}</li>
                    ))}
                </ul>

                <img className="xs-icon" src="public/next-icon.png" onClick={handleNextPage} />
            </div>
        </>

    );
}