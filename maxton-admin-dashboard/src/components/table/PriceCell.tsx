export default function PriceCell(props: { data: number }) {
    const { data } = props;

    return (
        <div className="price-cell">
            <p className="text-[14px]">${data}</p>
        </div>
    )
}