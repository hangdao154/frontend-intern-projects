import { mapPageLabel } from "../../../lib/helper";
import { menuItems } from "../../../lib/constants";
import PagePath from "../../../components/layout/PagePath";
import SearchBar from "../../../components/SearchBar";
import DarkButton from "../../../components/buttons/DarkButton";
import BlueButton from "../../../components/buttons/BlueButton";
import Table from "../../../components/table/Table";
import { useEffect, useRef, useState } from "react";
import { GetOrderQueries, NotificationType } from "../../../lib/interfaces";
import PageNav from "../../../components/pagination/PageNav";
import PageLimitSelector from "../../../components/pagination/PageLimitSelector";
import useOrders from "../hooks/useOrders";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
    pageInfo: { key: string, keyPath: string[] },
}

export default function OrdersTab(props: Props) {
    const { pageInfo } = props;
    const { getOrders, fetchedData, fetchedMsg, isLoading } = useOrders();
    const [filter, setFilter] = useState<GetOrderQueries>({ page: 1, limit: 10 })
    const navigate = useNavigate()

    const pathLabels: Array<null | string> = [];
    pageInfo.keyPath.forEach(item => pathLabels.push(mapPageLabel(menuItems, item)));
    pathLabels.reverse();


    const handleSetFilterSort = (sortInfo: { keyToSort: string, direction: string }) => {
        setFilter(prev => {
            console.log("Old sort:", prev.sortKey, prev.sortValue)
            const newState = { ...prev };
            newState.sortKey = sortInfo.keyToSort;
            newState.sortValue = sortInfo.direction;
            console.log("New sort:", newState.sortKey, newState.sortValue)
            return newState;
        })
    }

    const handleSetFilterKeyword = (keyword?: string) => {
        setFilter(prev => {
            console.log(`Old state: ${prev.keyword}`)
            const newState = { ...prev };
            if (keyword) {
                newState.keyword = keyword;
                console.log(`New state: ${newState.keyword}`);
            }
            return newState;
        })
    }

    const handleChangePage = (page: number | null) => {
        if (page !== null) {
            setFilter((prev) => {
                console.log(`Old page: ${prev.page}`)
                const newState = { ...prev };
                newState.page = page;
                console.log(`New page: ${newState.page}`);
                return newState;
            })
        }
    }

    const handleChangeLimit = (num: number) => {
        setFilter((prev) => {
            console.log(`Old limit: ${prev.page}`)
            const newState = { ...prev };
            newState.page = 1;
            newState.limit = num;
            console.log(`New limit: ${newState.page}`);
            return newState;
        })
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: `Error ${fetchedMsg?.code}`,
            description: fetchedMsg?.msg
        });
    };

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        getOrders(filter);
    }, [filter])

    useEffect(() => {
        console.log('Fetched message:', fetchedMsg);

        if (fetchedMsg?.code !== undefined) {
            const codeToString: string = String(fetchedMsg.code);

            switch (codeToString[0]) {
                case "0":
                case "4":
                case "5":
                    openNotificationWithIcon('error');
                    break;
                case "2":
                    openNotificationWithIcon('success');
                    break;
            }
        }
        else if (fetchedMsg?.code && typeof (fetchedMsg?.code) === 'string') {
            openNotificationWithIcon('error');
        }

        // Navigate to login page when access token expired
        setTimeout(() => {
            if (fetchedMsg?.code === 401) return navigate("/login")
        }, 1000);
    }, [fetchedMsg])

    const headers = ["name", "status", "discount", "subtotal", "tax", "total", "deliveryOption", "deliveryFee"];
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

            <div className="filter-group flex justify-between flex-wrap">
                <div className="left flex flex-wrap items-center mt-[24px]">
                    <SearchBar rounded="rounded-lg" onSearch={handleSetFilterKeyword} placeholder="Search customers" />
                    <div className="btn-group">
                        <DarkButton otherStyles="rounded-l-lg" content="Payment Status" iconR="arrow_drop_down" onClick={() => { }} />
                        <DarkButton content="Completed" iconR="arrow_drop_down" onClick={() => { }} />
                        <DarkButton otherStyles="rounded-r-lg" content="More Filters" iconR="arrow_drop_down" onClick={() => { }} />
                    </div>
                </div>

                <div className="right flex items-center mt-[24px]">
                    <DarkButton content="Export" iconL="exit_to_app" otherStyles="rounded-lg" onClick={() => { }} />
                    <BlueButton content="Add Product" iconL="add" />
                </div>
            </div>

            <div className="bg-[#070c29] p-[16px] rounded-lg mt-[24px]">
                <div style={{ border: "0", padding: "0" }} className="table-container">
                    <Table isLoading={isLoading} data={fetchedData && fetchedData.orders && fetchedData.orders} headers={headers && headers} handleSetFilterSort={handleSetFilterSort} hasActions={true}/>
                </div>
            </div>

            <div className="mt-[24px] flex justify-between items-center">
                <PageLimitSelector handleChangeLimit={handleChangeLimit} />
                <PageNav totalPages={fetchedData && fetchedData.pages ? fetchedData.pages : 1} currentPage={filter.page} handleChangePage={handleChangePage} />
            </div>
        </>
    )
}