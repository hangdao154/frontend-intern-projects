import { useState, useEffect } from 'react'
import BadgeItem from './BadgeItem';
import PageNav from '../../../components/pagination/PageNav';
import BadgeDetails from './BadgeDetails';
import { BadgeListItem } from '../../../interfaces';
import useBadges from '../hooks/custom-hooks';
import { IBadgeFilter } from '../constants/interfaces';
import { getPinnedBadges, getActions } from '../../../store/my-profile/selector';
import { mapBadgeImg } from '../../../lib/helper';
import { State } from '../../../store/my-profile/useMyProfileStore';



export default function MyBadges() {
    const userID = 2;

    const [popupState, setPopupState] = useState<boolean>(false);
    const [displayedPopupBadge, setDisplayedPopupBade] = useState<any>(undefined);
    const [filter, setFilter] = useState<IBadgeFilter>({ page: 1, limit: 12 });

    const { getBadges, fetchedData, fetchedMeta } = useBadges(userID);

    const { setPinnedBadges } = getActions();

    const pinnedBadges: Array<BadgeListItem | null> = getPinnedBadges();

    // Get filtered badges
    useEffect(() => {
        getBadges(filter);
    }, [filter])
    
    const filteredData: BadgeListItem[] = fetchedData.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        isDeleted: item.isDeleted,
        updatedAt: item.updatedAt,
        name: item.name,
        status: item.status,
        rank: item.rank,
        description: "",
        type: "",
        howToEarn: "",
        badgeImg: mapBadgeImg(item.name),
        button: "",
        pinnedStatus: false,
    }))

    const [currentPage, setCurrentPage] = useState<number>(fetchedMeta.currentPage);

    const ITEMS_PER_PAGE = fetchedMeta.itemsPerPage;
    const totalPages = fetchedMeta.totalPages;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const handlePinBadge = (pinnedBadges: State['pinnedBadges'], badgeToPin: BadgeListItem) => {
        if (badgeToPin.id) {
            if (!pinnedBadges.some(badge => badge !== null && badge.id === badgeToPin.id)) {
                const newPinnedBadges: State['pinnedBadges'] = [...pinnedBadges];
                newPinnedBadges[newPinnedBadges.indexOf(null)] = badgeToPin;
                return newPinnedBadges;
            }
        }
        return pinnedBadges;
    }

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
                    <option>Tier (All)</option>
                    <option>Others</option>
                    <option>Bronze (Tier 1)</option>
                </select>
                <select className="selector" onChange={(e) => {
                    console.log(e.target.value);
                    handleSetFilterStatus(e.target.value);
                }}>
                    <option>Status (All)</option>
                    <option>Claimed</option>
                    <option>Not Claim</option>
                    <option>Unavailable</option>
                </select>
                <img className="md-icon" src="src/assets/refresh-icon.png" />
            </div>

            <div className="badges-container">
                {filteredData.map(item => (
                    <div key={index++}>
                        <img className={"badge-flag" + (item.status === "unavailable" ? " gray-scale" : " available")}
                            src={item.id !== undefined && pinnedBadges && pinnedBadges.some(badge => badge !== null && badge.id === item.id) ?
                                "src/assets/badge-actions/saved-icon.png" :
                                "src/assets/badge-actions/add-icon.png"}
                            onClick={item.status === "unavailable" ? undefined : () => setPinnedBadges(handlePinBadge(pinnedBadges, item))}
                        />
                        <BadgeItem data={item} handleBadgeClick={handleBadgeClick}>
                        </BadgeItem>
                    </div>
                ))}
            </div>

            <BadgeDetails popupState={popupState} data={displayedPopupBadge} handleChangePopupState={handleChangePopupState}></BadgeDetails>

            <div className={popupState === true ? "overlay-shown" : "overlay-hidden"}></div>

            <div className="pagination-container badge">
                <PageNav totalPages={totalPages} currentPage={currentPage} handleChangePage={handleChangePage} handleNextPage={() => handleNextPage(totalPages)} handlePreviousPage={handlePreviousPage}></PageNav>
            </div>
        </>
    )
}