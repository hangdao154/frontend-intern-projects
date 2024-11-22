import BadgeStatus from './BadgeStatus';
import { BadgeListItem } from '../../../interfaces';
import { getActions } from '../../../store/my-profile/selector';

interface Props {
    data: BadgeListItem,
    handleBadgeClick: (data: BadgeListItem) => void,
}

export default function BadgeItem(props: Props) {

    const { data, handleBadgeClick } = props;

    return (
        <div className="box badge-item" onClick={() => { handleBadgeClick(data) }}>
            {data.button}
            <img className={data.status === "unavailable" ? "badge-img gray-scale" : "badge-img"} src={data.badgeImg} />
            <p>{data.name}</p>

            <hr />

            <BadgeStatus status={data.status}></BadgeStatus>
        </div>
    )
}