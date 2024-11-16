import { useState, useEffect } from 'react'
import BadgeItem from './BadgeItem';
import PageNav from '../../../components/pagination/PageNav';
import BadgeDetails from './BadgeDetails';
import { BadgeListItem } from '../../../interfaces';
import useBadges from '../hooks/custom-hooks';
import { IBadgeFilter } from '../constants';


export default function MyBadges() {
    const userID = 1;

    const [popupState, setPopupState] = useState<boolean>(false);
    const [displayedPopupBadge, setDisplayedPopupBade] = useState<any>(undefined);
    const [filter, setFilter] = useState<IBadgeFilter>({ page: 1, limit: 12 });

    const { getBadges, fetchedData, fetchedMeta } = useBadges(userID);

    useEffect(() => {
        getBadges(filter);
    }, [filter])

    const [currentPage, setCurrentPage] = useState<number>(fetchedMeta.currentPage);
    console.log(fetchedMeta);

    const ITEMS_PER_PAGE = fetchedMeta.itemsPerPage;
    const totalPages = fetchedMeta.totalPages;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const handleSetFilterRank = (rank: string | undefined): void => {
        if (rank === "Tier") {
            rank = undefined;
        }

        setFilter((prevState: IBadgeFilter) => {
            console.log(`Old state: ${prevState.rank}`)
            const newState: IBadgeFilter = { ...prevState };
            newState.rank = rank;
            console.log(`New state: ${newState.rank}`);
            return newState;
        })
    }

    const handleSetFilterStatus = (status: string | undefined): void => {
        switch (status) {
            case "Not Claim":
                status = "not-claim";
                break;
            case "Unavailable":
            case "Claimed":
                status = status.toLocaleLowerCase();
                break;
            default: status = undefined;
        }

        setFilter((prevState: IBadgeFilter) => {
            console.log(`Old state: ${prevState.status}`)
            const newState: IBadgeFilter = { ...prevState };
            newState.status = status;
            console.log(`New state: ${newState.status}`);
            return newState;
        })
    }

    function handleBadgeClick(badge: BadgeListItem) {
        setPopupState(true);
        setDisplayedPopupBade(badge);
    }

    function handleChangePopupState(state: boolean) {
        setPopupState(state);
    }

    const handleBadgeImg = (name: string): string => {
        switch (name) {
            case ("X beginner"): return "src/assets/badge/user-badge/badge_1.png";
            case ("Discord beginner"): return "src/assets/badge/user-badge/badge_2.png";
            case ("Rookie"): return "src/assets/badge/user-badge/badge_3.png";
            case ("Pathfinder"): return "src/assets/badge/user-badge/badge_4.png";
            default: return "src/assets/badge/badge1.png";
        }
    }

    // Pagination
    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = (totalPages: number) => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    let index = startIndex;

    return (
        <>
            <div className="filter-section">
                <select className="selector" onChange={(e) => {
                    console.log(e.target.value);
                    handleSetFilterRank(e.target.value);
                }}>
                    <option>Tier</option>
                    <option>Others</option>
                    <option>Bronze (Tier 1)</option>
                </select>
                <select className="selector" onChange={(e) => {
                    console.log(e.target.value);
                    handleSetFilterStatus(e.target.value);
                }}>
                    <option>Status</option>
                    <option>Not Claim</option>
                    <option>Unavailable</option>
                </select>
                <img className="md-icon" src="src/assets/refresh-icon.png" />
            </div>

            <div className="badges-container">
                {fetchedData.map(item => (
                    <BadgeItem key={index++} data={item} handleBadgeClick={handleBadgeClick} handleBadgeImg={handleBadgeImg}>
                    </BadgeItem>
                ))}
            </div>

            <BadgeDetails popupState={popupState} data={displayedPopupBadge} handleChangePopupState={handleChangePopupState} handleBadgeImg={handleBadgeImg}></BadgeDetails>

            <div className={popupState === true ? "overlay-shown" : "overlay-hidden"}></div>

            <div className="pagination-container badge">
                <PageNav totalPages={totalPages} currentPage={currentPage} handleChangePage={handleChangePage} handleNextPage={() => handleNextPage(totalPages)} handlePreviousPage={handlePreviousPage}></PageNav>
            </div>
        </>
    )
}