import { mapPageLabel } from "../../../lib/helper";
import { menuItems } from "../../../lib/constants";
import PagePath from "../../../components/layout/PagePath";
import SearchBar from "../../../components/SearchBar";
import DarkButton from "../../../components/buttons/DarkButton";
import BlueButton from "../../../components/buttons/BlueButton";
import Table from "../../../components/table/Table";
import { useEffect, useRef, useState } from "react";
import { GetProductQueries, NotificationType } from "../../../lib/interfaces";
import PageNav from "../../../components/pagination/PageNav";
import PageLimitSelector from "../../../components/pagination/PageLimitSelector";
import useProducts from "../hooks/useProducts";
import DarkSelectComponent from "../../../components/DarkSelectComponent";
import { Category, Vendor } from "../constants";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
    pageInfo: { key: string, keyPath: string[] },
}


export default function ProductsTab(props: Props) {
    const { pageInfo } = props;
    const pathLabels: Array<null | string> = [];
    pageInfo.keyPath.forEach(item => pathLabels.push(mapPageLabel(menuItems, item)));
    pathLabels.reverse();


    const { getProducts, fetchedData, isLoading, fetchedMsg, deleteProduct } = useProducts();

    const [filter, setFilter] = useState<GetProductQueries>({ page: 1, limit: 10 })
    const headers = ["title", "price", "category", "tags", "vendor", "createdAt", "updatedAt"];

    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: `Error ${fetchedMsg?.code}`,
            description: fetchedMsg?.msg
        });
    };

    const handleSetFilter = (name: string, value: any) => {
        if (filter[name as keyof GetProductQueries] === value)  // Value unchanged
            return
        else if (name === value)  // Label of the selector
            setFilter({ ...filter, [name]: undefined })
        else setFilter({
            ...filter,
            [name]: value
        })
    };

    const handleSetFilterSort = (sortInfo: { keyToSort: string, direction: string }) => {
        setFilter({...filter, sortKey: sortInfo.keyToSort, sortValue: sortInfo.direction})
    }

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current) {
            getProducts(filter);
        }
        isFirstRender.current = false; // Set after the first render
    }, [filter])

    useEffect(() => {
        console.log('Fetched message:', fetchedMsg);

        if (fetchedMsg?.code !== undefined) {
            const status = String(fetchedMsg.code)[0];
            if (status === "4" || status === "0") {
                openNotificationWithIcon('error');
            }

            // Navigate to login page when access token expired
            setTimeout(() => {
                if (fetchedMsg?.code === 401) return navigate("/login")
            }, 1000);
        }
    }, [fetchedMsg])


    return (
        <>

            {contextHolder}
            <div className="flex flex-wrap justify-between items-center">
                <PagePath pathLabels={pathLabels} />
                <div className="btn-group blue-btn gap-[16px]">
                    <button className="pl-[16px] py-[8px] rounded-lg text-[16px]">Settings</button>
                    <button className="material-symbols-outlined">arrow_drop_down</button>
                </div>
            </div>

            <div className="filter-group flex flex-wrap justify-between">
                <div className="left flex flex-wrap items-center mt-[24px]">
                    <SearchBar rounded="rounded-lg" onSearch={handleSetFilter} placeholder="Search products" />
                    <div className="btn-group">
                        <DarkSelectComponent type={Category} styles="rounded-l-lg" action={handleSetFilter} />
                        <DarkSelectComponent type={Vendor} styles="rounded-r-lg" action={handleSetFilter} />
                    </div>
                </div>

                <div className="right flex items-center mt-[24px]">
                    <DarkButton content="Export" iconL="exit_to_app" otherStyles="rounded-lg" onClick={() => { }} />
                    <a href="/add-product"><BlueButton content="Add Product" iconL="add" /></a>
                </div>
            </div>

            <div>
                <div className="bg-[#070c29] p-[16px] rounded-lg mt-[24px]">
                    <div style={{ border: "0", padding: "0" }} className="table-container">
                        <Table
                            isLoading={isLoading}
                            data={fetchedData && fetchedData.products && fetchedData.products}
                            headers={headers}
                            handleSetFilterSort={handleSetFilterSort}
                            deleteProduct={deleteProduct}
                            hasActions={true}
                        />
                    </div>
                </div>

                <div className="mt-[24px] flex justify-between items-center">
                    <PageLimitSelector handleChangeLimit={handleSetFilter} />
                    <PageNav totalPages={fetchedData && fetchedData.pages ? fetchedData.pages : 1} currentPage={filter.page} handleChangePage={handleSetFilter} />
                </div>
            </div>

        </>
    )
}