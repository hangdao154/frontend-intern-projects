import DarkButton from "../buttons/DarkButton";

export default function RatingCell(props: { data: string }) {
    const { data } = props;

    return (
        <DarkButton content={data} otherStyles="rounded-md star" iconL="star" />
    )
}