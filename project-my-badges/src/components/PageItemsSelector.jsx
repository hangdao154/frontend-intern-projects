export default function PageItemsSelector(props) {
    const { handleChangeItemsPerPage } = props;

    return (
        <div className="outline-box">
            <select onChange={(e) => {
                handleChangeItemsPerPage(parseInt(e.target.value.split("").slice(0, 2).join("")));
            }}>
                <option>10/page</option>
                <option>20/page</option>
                <option>30/page</option>
                <option>40/page</option>
                <option>50/page</option>
            </select>
        </div>
    )
}