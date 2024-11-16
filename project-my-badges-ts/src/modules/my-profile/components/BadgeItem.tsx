import BadgeStatus from './BadgeStatus';
import { BadgeListItem } from '../../../interfaces';

interface Props {
    data: BadgeListItem,
    handleBadgeClick: (data: BadgeListItem) => void,
    handleBadgeImg: (name: string) => string
}

export default function BadgeItem(props: Props) {

    const { data, handleBadgeClick, handleBadgeImg } = props;

    // const badgeImg = document.querySelector(".badge-item .badge-img");

    // data.status === "unavailable" ? badgeImg?.classList.add("gray-scale") : badgeImg?.classList.add();

    return (
        <div className="box badge-item" onClick={() => { handleBadgeClick(data) }}>
            {data.button}
            <img className={data.status === "unavailable" ? "badge-img gray-scale" : "badge-img"} src={handleBadgeImg(data.name)} />
            <p>{data.name}</p>

            <hr />

            <BadgeStatus status={data.status}></BadgeStatus>
        </div>
    )
}