import { React, useState } from 'react'
import BadgeItem from './BadgeItem'
import PageNav from './PageNav'
import BadgeDetails from './BadgeDetails';

export default function MyBadges(props) {
    const { data, handleSort, onClick } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [popupState, setPopupState] = useState("false");
    const [displayedPopupBadge, setDisplayedPopupBade] = useState(undefined);

    const ITEMS_PER_PAGE = 12;
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    // Pagination
    function handleBadgeClick(badge) {
        setPopupState("true");
        setDisplayedPopupBade(badge);
    }

    function handleChangePopupState(state) {
        setPopupState(state);
    }

    function getCurrentItems(data) {
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return data.slice(startIndex, endIndex);
    }

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = (totalPages) => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    let index = startIndex;

    return (
        <>
            <div className="filter-section">
                <select className="selector">
                    <option>Tier</option>
                </select>
                <select className="selector">
                    <option>Status</option>
                </select>
                <img className="md-icon" src="public/refresh-icon.png" />
            </div>

            <div className="badges-container">
                {getCurrentItems(data).map(item => (
                    <BadgeItem key={index++} data={item} handleBadgeClick={handleBadgeClick}>
                    </BadgeItem>
                ))}
            </div>

            <BadgeDetails popupState={popupState} data={displayedPopupBadge} handleChangePopupState={handleChangePopupState}></BadgeDetails>

            <div className={popupState === "true" ? "overlay-shown" : "overlay-hidden"}></div>

            <div className="pagination-container badge">
                <PageNav totalPages={totalPages} currentPage={currentPage} handleChangePage={handleChangePage} handleNextPage={() => handleNextPage(totalPages)} handlePreviousPage={handlePreviousPage}></PageNav>
            </div>
        </>
    )
}