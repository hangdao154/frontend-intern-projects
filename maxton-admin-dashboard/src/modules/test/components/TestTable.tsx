import { ReactElement, useEffect, useState } from "react";
import { Customer, Order, GetProductQueries } from '../../../lib/interfaces'
import { Checkbox, Spin } from 'antd';
import type { CheckboxProps } from 'antd';
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { IGetProducts } from "./TestProductsTab";

interface TableData extends IGetProducts, Customer, Order { }

interface Props {
    isLoading?: boolean,
    data: Partial<TableData>[] | undefined,
    columns: Array<{ key: string, title: string, render: (dataObj: any) => ReactElement }>,
    handleSetFilterSort?: (sortInfo: { keyToSort: string, direction: string }) => void
    hasActions: boolean,
}

export default function TestTable(props: Props) {

    const { data, handleSetFilterSort, columns, isLoading, hasActions } = props;

    const [sort, setSort] = useState({ keyToSort: "", direction: "asc" });
    const [checkedList, setCheckedList] = useState<(string | undefined)[] | undefined>();
    const plainOptions = data?.map(item => item._id);

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
    };

    const onCheckboxChange = (e: CheckboxChangeEvent) => {
        handleChangeCheckedList(e.target.name);
    }

    const handleChangeCheckedList = (name: string | undefined) => {
        setCheckedList(prev => {
            if (prev === undefined) {
                if (name) return [name];
            }
            else {
                if (name) {
                    if (prev?.includes(name)) {
                        return prev.filter(id => id !== name);
                    } else {
                        return [...prev, name];
                    }
                }
            }
        });
    }

    const handleHeaderClick = (header: string) => {
        // Set the sort info: key & direction
        setSort(prev => {
            const newSortInfo: { keyToSort: string, direction: string } = { ...prev };
            newSortInfo.keyToSort = header;
            newSortInfo.direction = (header === prev.keyToSort) ? ((prev.direction === "asc") ? "desc" : "asc") : "asc";
            console.log(newSortInfo);
            // Pass the new sort info back to sort function
            if (handleSetFilterSort) {
                handleSetFilterSort({ keyToSort: newSortInfo.keyToSort, direction: newSortInfo.direction });
            }
            return newSortInfo;
        });
    }

    const displayTable = () => {
        // while (isLoading) {
        //     return <div className="flex justify-center items-center px-auto"><Spin size="large" /></div>
        // }
        return (
            <div className="bg-[#070c29] p-[16px] rounded-lg mt-[24px]">
                <div style={{ border: "0", padding: "0" }} className="table-container">
                    <table>
                        <thead className="bg-white">
                            <tr>
                                {hasActions &&
                                    <th className="px-[16px] py-[8px] text-left">
                                        <Checkbox onChange={onCheckAllChange}></Checkbox>
                                    </th>}
                                {columns && columns.map(col => (
                                    <th className="p-[16px] text-[14px] text-black text-left uppercase font-[600]" key={col.key} onClick={() => { handleHeaderClick(col.key) }}>{col.title}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data && data.map((obj, index) => (
                                <tr key={index} className="card-body">
                                    {hasActions &&
                                        <td>
                                            <Checkbox name={obj["_id"]}
                                            checked={checkedList !== undefined && checkedList.includes(obj["_id"])}
                                            onChange={(e) => onCheckboxChange(e)}></Checkbox>
                                        </td>
                                    }
                                    {columns.map(col => (
                                        <td key={String(index) + col.key}>{col.render(obj)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return displayTable()
}