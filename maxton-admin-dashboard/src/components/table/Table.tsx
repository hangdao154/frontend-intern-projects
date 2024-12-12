import { useEffect, useState } from "react";
import { Product, Customer, Order, GetProductQueries } from "../../lib/interfaces";
import { camelCaseToWords, displayOrderID, displayTime } from "../../lib/helper";
import DateCell from "./DateCell";
import PriceCell from "./PriceCell";
import NameCell from "./NameCell";
import RatingCell from "./RatingCell";
import TagCell from "./TagCell";
import StatusCell from "./StatusCell";
import { Checkbox, Spin } from 'antd';
import type { CheckboxProps } from 'antd';
import { CheckboxChangeEvent } from "antd/es/checkbox";
import DarkButton from "../buttons/DarkButton";
import useProducts from "../../modules/ecommerce/hooks/useProducts";
import { useNavigate } from "react-router-dom";

interface TableData extends Product, Customer, Order { }

interface Props {
    isLoading?: boolean,
    data: Partial<TableData>[] | undefined,
    headers: string[],
    handleSetFilterSort?: (sortInfo: { keyToSort: string, direction: string}) => void
    hasActions: boolean,
    deleteProduct?: (id: string | undefined) => Promise<void>
}

export default function Table(props: Props) {
    
    const navigate = useNavigate();

    const { data, handleSetFilterSort, headers, isLoading, hasActions, deleteProduct } = props;

    // const { deleteProduct, fetchedMsg } = useProducts();

    const [sort, setSort] = useState({ keyToSort: "", direction: "asc" });
    const [checkedList, setCheckedList] = useState<(string | undefined)[] | undefined>();
    const [selectedItem, setSelectedItem] = useState<string | undefined>()
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
                 handleSetFilterSort({ keyToSort: newSortInfo.keyToSort, direction: newSortInfo.direction});
            }
            return newSortInfo;
        });
    }

    const handlePrintCell = (key: string, val: any, index: number) => {
        if (key === "deliveryOption") console.log(val);


        switch (key) {
            case "title":
                return <NameCell name={val} imgURL={data && data[index].image} category={data && data[index].category} />
            case "name":
            case "customerName":
                return <NameCell name={val} imgURL={data && data[index].avatar ? data[index].avatar : (
                    data && data[index].userId && data[index].userId.avatar ? data[index].userId.avatar : "src/assets/images/customers/1.png"
                )} />
            case "orderId":
                return <div className="text-[#0d6efd] text-[14px]">#{displayOrderID(val)}</div>
            case "isActive":
            case "isDeleted":
            case "status":
                return <StatusCell status={val} />
            case "category":
            case "orders":
            case "location":
            case "color":
                return <div className="text-[14px] text-white">{camelCaseToWords(val ? val : "")}</div>;
            case "size":
                return <div className="text-[14px] text-white">{val ? val.toUpperCase() : val}</div>;
            case "tags":
                return <TagCell data={val} />
            case "createdAt":
            case "deletedAt":
            case "updatedAt":
                return <DateCell data={displayTime(new Date(val))} />
            case "price":
            case "discount":
            case "subtotal":
            case "totalPaid":
            case "deliveryFee":
            case "itemSubtotal":
                return <PriceCell data={val} />
            case "quantity":
            case "email":
            case "totalOrders":
                return <div className="text-[#0d6efd] text-[14px]">{val}</div>
            case "vendor":
            case "role":
            case "deliveryOption":
                return <div className="text-[#0d6efd] text-[14px]">{camelCaseToWords(val ? val : "")}</div>
            case "rating":
                return <RatingCell data={"5.0"} />
            case "tax":
            case "total":
                return <div className="text-[14px] text-white">${val.toFixed(2)}</div>
        }
    }

    const displayTable = () => {
        while (isLoading) {
            return <div className="flex justify-center items-center px-auto"><Spin size="large" /></div>
        }
        return (
            <table>
                <thead className="bg-white">
                    <tr>
                        {hasActions && <th className="px-[16px] py-[8px] text-[14px]">
                            <Checkbox onChange={onCheckAllChange}></Checkbox>
                        </th>}
                        {headers && headers.map(header => (
                            <th className="p-[16px] text-[14px] text-black text-left uppercase font-[600]" key={header} onClick={() => { handleHeaderClick(header) }}>{camelCaseToWords(header)}</th>
                        ))}
                        {hasActions && <th className="px-[16px] py-[8px] text-[14px] text-black text-left uppercase">ACTIONS</th>}
                    </tr>
                </thead>
                
                <tbody>
                    {data && data.map((obj, index) => (
                        <tr key={index} className="card-body"
                            onClick={() =>
                                navigate(headers.includes("price") ? "" : (
                                    headers.includes("email") ? `/customer-details/${obj._id}` : `/order-details/${obj._id}`
                                ))
                            }>

                            {hasActions &&
                                <td><Checkbox name={obj["_id"]}
                                    checked={checkedList !== undefined && checkedList.includes(obj["_id"])}
                                    onChange={(e) => onCheckboxChange(e)}></Checkbox>
                                </td>
                            }

                            {headers.map(header => (
                                <td key={String(index) + header}>{handlePrintCell(header, obj[header as keyof (Product | Customer | Order)], index)}</td>
                            ))}

                            {hasActions &&
                                <td className="relative content-center pl-[30px]">
                                    <DarkButton content="..." otherStyles="rounded-lg" onClick={() => {
                                        if (selectedItem !== obj["_id"]) setSelectedItem(obj["_id"])
                                        else setSelectedItem(undefined)
                                    }} />
                                    <div className={"absolute top-[70px] z-[1000] left-0 flex flex-col justify-start shadow-md" + (selectedItem === (obj._id) ? "" :
                                        " hidden")}>
                                        <a href={headers.includes("price") ? `/update-product/${obj._id}` : (
                                            headers.includes("name") ? `/update-customer/${obj._id}` : ""
                                        )}>
                                            <DarkButton name={obj["_id"]} content="Update" otherStyles="rounded-t-lg" />
                                        </a>
                                        <DarkButton name={obj["_id"]} content="Delete" otherStyles="rounded-b-lg" onClick={() => {
                                            if (headers.includes("price")) {
                                                deleteProduct && deleteProduct(obj._id);
                                            }
                                        }} />
                                    </div>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    return displayTable()
}