import { useState } from "react";

import Points from "../../../components/Points";
import Table from "../../../components/table/Table";
import PageNav from "../../../components/pagination/PageNav";
import PageItemsSelector from "../../../components/pagination/PageItemSelector";
import { PointData } from "../../../interfaces";


interface Props {
    data: Array<PointData>,
    handleSort: (data: Array<any>, sortInfo: { keyToSort: string, direction: string }) => Array<PointData>
}

export default function PointHistory(props: Props) {
    const { data, handleSort } = props;
    const headers: string[] = Object.keys(data[0]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [sortedData, setSortedData] = useState<Array<PointData>>(data);

    // Pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    function getCurrentItems(data: Array<PointData>, itemsPerPage: number) {
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    const handleChangePage = (page: any) => {
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

    const handleChangeItemsPerPage = (num: number) => {
        setCurrentPage(1);
        setItemsPerPage(num);
    }

    // Pass the sort info and the data list to sort back to sort function
    const handleKeyToSort = (sortInfo: { keyToSort: string, direction: string }) => {
        setSortedData(handleSort(data.slice(), sortInfo));
    }

    return (
        <>
            <div className="filter-section">
                <div className="search-box">
                    <img className="sm-icon inline-icon" src="src/assets/search.png" />
                    <input placeholder="Search by wallet address" />
                </div>
                <div className="date-box">
                    <input type="text" placeholder="Transaction Date" onFocus={(e) => {
                        e.target.type = "date"
                    }} />
                </div>
                <p>to</p>
                <div className="date-box">
                    <input type="text" placeholder="Transaction Date" onFocus={(e) => {
                        e.target.type = "date"
                    }} />
                </div>
                <select>
                    <option>All Tasks</option>
                </select>
                <select>
                    <option>Status</option>
                </select>
                <img className="md-icon" src="src/assets/refresh-icon.png" />
            </div>

            <div className="summary">
                <div className="left">
                    <p style={{ color: "#4E5464" }}>Total Points:</p>
                    <Points point={100000000}></Points>
                    <img className="sm-icon" src="src/assets/question-icon.png" />
                </div>
                <div className="right">
                    <p style={{ color: "#4E5464" }}>Total Transactions: {data.length}</p>
                </div>
            </div>

            <Table data={getCurrentItems(sortedData, itemsPerPage)} index={startIndex} handleKeyToSort={handleKeyToSort} headers={headers}></Table>

            <div className="pagination-container">
                <PageItemsSelector handleChangeItemsPerPage={handleChangeItemsPerPage}></PageItemsSelector>
                <PageNav totalPages={totalPages} currentPage={currentPage} handleChangePage={handleChangePage} handleNextPage={() => handleNextPage(totalPages)} handlePreviousPage={handlePreviousPage}></PageNav>
            </div>
        </>
    )
}