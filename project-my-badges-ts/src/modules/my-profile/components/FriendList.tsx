import { useState } from "react";

import Points from "../../../components/Points";
import Table from "../../../components/table/Table";
import PageNav from "../../../components/pagination/PageNav";
import PageItemsSelector from "../../../components/pagination/PageItemSelector";
import { Friend } from "../../../interfaces";
import CheckboxComponent from "../../../components/CheckboxComponent"

interface Props {
    data: any,
    handleSort: (data: Array<Friend>, sortInfo: { keyToSort: string, direction: string }) => Array<Friend>
}

export default function FriendList(props: Props) {
    const { data, handleSort } = props;
    const MAX_HEADERS: number = 5;
    const headers: string[] = Object.keys(data[0]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [sortedData, setSortedData] = useState<Array<Friend>>(data);
    const [showColSettings, setShowColSettings] = useState<boolean>(false);
    const [colsToDisplay, setColsToDisplay] = useState<string[]>(headers.slice(0, MAX_HEADERS));

    

    // Pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    function getCurrentItems(data: Array<Friend>, itemsPerPage: number) {
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

    const handleShowColSettings = (state: boolean) => {
        setShowColSettings(state);
    } 

    const handleSetColsToDisplay = (cols: string[]) => {
        setColsToDisplay(cols);
    }

    // Pass the sort info and the data list to sort back to sort function
    const handleKeyToSort = (sortInfo: { keyToSort: string, direction: string }) => {
        setSortedData(handleSort(data.slice(), sortInfo));
    }

    return (
        <>
            <div className="settings">
                <div className="filter-section">
                    <div className="search-box">
                        <img className="sm-icon inline-icon" src="src/assets/search.png" />
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
                    <img className="md-icon" src="src/assets/refresh-icon.png" />
                </div>

                <img className="lg-icon btn" src="src/assets/setting-blue.png" onClick={() => setShowColSettings(true)} />
                <CheckboxComponent showColSettings={showColSettings} handleShowColSettings={handleShowColSettings} headers={headers} colsToDisplay={colsToDisplay} handleSetColsToDisplay={handleSetColsToDisplay} maxSelection={MAX_HEADERS}></CheckboxComponent>
                <div className={showColSettings === true ? "overlay-shown" : "overlay-hidden"}></div>
            </div>

            <div className="summary">
                <div className="left">
                    <p style={{ color: "#4E5464" }}>Your Referral Rewards:</p>
                    <Points point={100000000}></Points>
                </div>
                <div className="right">
                    <p style={{ color: "#4E5464" }}>Total Friends: {data.length}</p>
                </div>
            </div>

            <Table data={getCurrentItems(sortedData, itemsPerPage)} headers={colsToDisplay} index={startIndex} handleKeyToSort={handleKeyToSort}></Table>

            <div className="pagination-container">
                <PageItemsSelector handleChangeItemsPerPage={handleChangeItemsPerPage}></PageItemsSelector>

                <PageNav totalPages={totalPages} currentPage={currentPage} handleChangePage={handleChangePage} handleNextPage={() => handleNextPage(totalPages)} handlePreviousPage={handlePreviousPage}></PageNav>
            </div>
        </>
    )
}