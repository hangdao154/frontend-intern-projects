import { useState } from "react";
import { BadgeListItem } from "../../../interfaces";

interface Props {
    popupState: boolean,
    data: BadgeListItem,
    handleChangePopupState: (state: boolean) => void,
}

export default function BadgeDetails(props: Props) {
    const { popupState, data, handleChangePopupState} = props;

    // data = { id -> img, createdAt, updatedAt, isDeleted, name, rank, status }
    // status: claimed, not-claim, unavailable


    if (popupState === true) {
        const [currentPage, setcurrentPage] = useState<number>(1);
        const [visibleContent, setVisibleContent] = useState<string>(data.description);

        return (
            <div className="container badge-details popup">
                <img src="src/assets/x-button.png" className="escape-btn sm-icon" onClick={() => handleChangePopupState(false)} />

                <img className="badge-img"src={data.badgeImg} />

                <h1>{data.name}</h1>
                <div className="type-tier-container">
                    <p className="badge-type">{data.type}</p>
                    <p className="badge-tier">{data.rank}</p>
                </div>

                <ul className="currentPage-slider">
                    <li className={currentPage === 1 ? "active-button" : ""} onClick={() => {
                        setcurrentPage(1);
                        setVisibleContent(data.description);
                    }}>Description</li>
                    <li className={currentPage === 2 ? "active-button" : ""} onClick={() => {
                        setcurrentPage(2);
                        setVisibleContent(data.howToEarn);
                    }}>How To Earn</li>
                </ul>

                <p>{visibleContent}</p>

            </div>
        )
    } else {
        return (<></>)
    }
}