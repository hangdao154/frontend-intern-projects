import { useState, useEffect } from "react";

import Points from "./Points";
import Table from "./Table";
import PageNav from "./PageNav";
import PageItemsSelector from "./PageItemsSelector";

export default function FriendList(props) {
    const { data, handleSort } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortedData, setSortedData] = useState(data);

    // Pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    function getCurrentItems(data, itemsPerPage) {
        const endIndex = startIndex + itemsPerPage;
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

    const handleChangeItemsPerPage = (num) => {
        setCurrentPage(1);
        setItemsPerPage(num);
    }

    // Pass the sort info and the data list to sort back to sort function
    const handleKeyToSort = (sortInfo) => {
        setSortedData(handleSort(data.slice(), sortInfo));
    }

    return (
        <>
            <div className="settings">
                <div className="filter-section">
                    <div className="search-box">
                        <img className="sm-icon inline-icon" src="public/search.png" />
                        <input placeholder="Search by wallet address" />
                    </div>
                    <div className="date-box">
                        <input type="text" placeholder="Joined Date" onFocus={(e) => {
                            e.target.type = "date"
                        }} />
                    </div>
                    <p>to</p>
                    <div className="date-box">
                        <input type="text" placeholder="Joined Date" onFocus={(e) => {
                            e.target.type = "date"
                        }} />
                    </div>
                    <img className="md-icon" src="public/refresh-icon.png" />
                </div>

                <img className="lg-icon" src="public/setting-blue.png" />
            </div>

            <div className="summary">
                <div className="left">
                    <p style={{ color: "#4E5464" }}>Your Referral Rewards:</p>
                    <Points point="100,000,000 SP"></Points>
                </div>
                <div className="right">
                    <p style={{ color: "#4E5464" }}>Total Friends: {data.length}</p>
                </div>
            </div>

            <Table data={getCurrentItems(sortedData, itemsPerPage)} index={startIndex} handleKeyToSort={handleKeyToSort}></Table>

            <div className="pagination-container">
                <PageItemsSelector handleChangeItemsPerPage={handleChangeItemsPerPage}></PageItemsSelector>

                <PageNav totalPages={totalPages} currentPage={currentPage} handleChangePage={handleChangePage} handleNextPage={() => handleNextPage(totalPages)} handlePreviousPage={handlePreviousPage}></PageNav>
            </div>
        </>
    )
}