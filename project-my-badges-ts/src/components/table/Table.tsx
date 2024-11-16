import { useState } from "react";

import Points from "../Points";
import LevelCell from "./LevelCell";
import TaskNameCell from "./TaskNameCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";

import { Friend, PointData } from '../../interfaces'

interface Props {
    data: Array<Friend | PointData>,
    index: number,
    headers: string[],
    handleKeyToSort: (sortInfo: { keyToSort: string, direction: string }) => void
}

export default function Table(props: Props) {
    const { data, index, handleKeyToSort, headers } = props;

    const [sort, setSort] = useState({ keyToSort: "", direction: "asc" });

    let currentIndex = index;

    function handleHeaderClick(header: string) {
        // Set the sort info: key & direction
        setSort(prev => {
            const newSortInfo: { keyToSort: string, direction: string } = { ...prev };
            newSortInfo.keyToSort = header;
            newSortInfo.direction = (header === prev.keyToSort) ? ((prev.direction === "asc") ? "desc" : "asc") : "asc";
            console.log(newSortInfo);
            // Pass the new sort info back to sort function
            handleKeyToSort(newSortInfo);
            return newSortInfo;
        });


    }

    function camelCaseToWords(s: string) {
        const result = s.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
      }

    const handlePrintCell = (key: string, val: any) => {
        switch (key) {
            case "walletAddress":
            case "refereeCount":
            case "refereeAdress":
                return val;
            case "joinedDate":
            case "transactionDate":
                return (<DateCell
                    date={[val.getFullYear(), val.getMonth() + 1, val.getDate()].join("/")}
                    time={[val.getHours(), val.getMinutes(), val.getSeconds()].join(":")}></DateCell>)
            case "earnedPoints":
            case "yourRefereeRewards":
                return (<Points point={val}></Points>)
            case "level":
                return (<LevelCell level={val}></LevelCell>)
            case "taskName":
                return (<TaskNameCell data={val}></TaskNameCell>)
            case "relatedPost":
                return (<img className="sm-icon" src="src/assets/extend-icon.png" />)
            case "status":
                return (<StatusCell status={val}></StatusCell>)
        }
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr key={currentIndex++}>
                        <th>No</th>

                        {headers.map(header => (
                            <th key={header} onClick={() => { handleHeaderClick(header) }}>{camelCaseToWords(header)}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map(obj => (
                        <tr key={currentIndex++}>
                            <td>{currentIndex}</td>
                            {headers.map(header => (
                                <td key={String(currentIndex) + header}>{handlePrintCell(header, obj[header as keyof (PointData | Friend)])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}