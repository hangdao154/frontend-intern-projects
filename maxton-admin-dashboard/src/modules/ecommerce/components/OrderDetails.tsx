import { useNavigate, useParams } from "react-router-dom";
import useOrders from "../hooks/useOrders";
import { useEffect, useRef } from "react";
import { notification, Spin } from "antd";
import { NotificationType } from "../../../lib/interfaces";
import OutlinedButton from "../../../components/buttons/OutlinedButton";
import Table from "../../../components/table/Table";
import PagePath from "../../../components/layout/PagePath";
import { mapPageLabel } from "../../../lib/helper";
import { menuItems } from "../../../lib/constants";
import DarkSelectComponent from "../../../components/DarkSelectComponent";
import { CompletedStatus, PaymentStatus } from "../constants";
import BillingDetails from "./BillingDetails";

interface Props {
    pageInfo: { key: string, keyPath: string[] }
}

export default function OrderDetails(props: Props) {
    const { pageInfo } = props;
    const pathLabels: Array<null | string> = [];
    pageInfo.keyPath.forEach(item => pathLabels.push(mapPageLabel(menuItems, item)));
    pathLabels.reverse();

    const navigate = useNavigate();
    const { id } = useParams();
    const {
        fetchedMsg,
        fetchedData,
        getOrderByID,
        isLoading
    } = useOrders();

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current && id) {
            if (id) getOrderByID(id);
        }
        isFirstRender.current = false; // Set after the first render
        console.log("Fetched data:", fetchedData);
    }, [])

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: `Error ${fetchedMsg?.code}`,
            description: fetchedMsg?.msg
        });
    };

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

    const displayPage = () => {
        while (isLoading) {
            return <div className="flex justify-center items-center px-auto overflow-y-hidden"><Spin size="large" /></div>
        }

        const order = fetchedData;
        return (
            <div className="xs: flex flex-col lg:grid grid-cols-3 gap-[20px]">
                <div className="order-id card-body mt-[24px] flex justify-between flex-wrap gap-[20px] col-span-3">
                    <div>
                        <h4 className="text-[24px] font-[500]">Order #{order && order._id ? order._id : "ID"}</h4>
                        <p>Customer ID: <span className="text-[#0D6EFD] font-bold">{order && order.userId ? order.userId._id : "ID"}</span></p>
                    </div>
                    <div className="btn-group">
                        <OutlinedButton color="#0D6EFD" iconL="print" content="Print" otherStyle="rounded-l-md" />
                        <OutlinedButton color="#0D6EFD" iconL="refresh" content="Refund" />
                        <OutlinedButton color="#0D6EFD" iconR="arrow_drop_down" content="More Actions" otherStyle="rounded-r-md" />
                    </div>
                </div>

                <div className="card-body col-span-2 row-span-2">
                    <div className="table-container">
                        <p className="text-[24px] mb-[20px]">{`Products (${order && order.products ? order.products.length : 0})`}</p>
                        <Table isLoading={isLoading} data={order && order.products ? order.products : []} headers={["title", "price", "category", "color", "size", "quantity", "itemSubtotal"]} hasActions={false} />
                    </div>
                    <div className="flex justify-between mt-[20px]">
                        <p className="font-[500]">Item subtotal: </p>
                        <p className="font-[500]">${order && order.subtotal ? order.subtotal : "..."}</p>
                    </div>
                </div>

                <div className="card-body col-span-1 row-span-1">
                    <h4 className="text-[24px] font-[500]">Summary</h4>
                    <div className="grid grid-cols-2 gap-[20px] py-[20px] border-b border-[#FFFFFF20]">
                        <p className="text-[14px]">Items subtotal: </p>
                        <p className="text-[14px] text-right">${order && order.subtotal ? order.subtotal : "..."}</p>
                        <p className="text-[14px]">Discount: </p>
                        <p className="text-[14px] text-right text-red-600">-${order && order.discount ? order.discount.toFixed(2) : "..."}</p>
                        <p className="text-[14px]">Tax: </p>
                        <p className="text-[14px] text-right">${order && order.tax ? order.tax.toFixed(2) : "..."}</p>
                        <p className="text-[14px]">Shipping cost: </p>
                        <p className="text-[14px] text-right">$50</p>
                    </div>
                    <div className="flex justify-between mt-[20px]">
                        <p className="text-[20px] font-[500]">Total: </p>
                        <p className="text-[20px] font-[500] text-right">${order && order.total ? order.total.toFixed(2) : "..."}</p>
                    </div>
                </div>
                <div className="card-body col-span-1 row-span-1">
                    <h4 className="text-[24px] font-[500]">Order Status</h4>
                    <label className="sub-label">Payment Status
                        <DarkSelectComponent styles={"rounded-md w-full mt-[16px]"} type={PaymentStatus} />
                    </label>
                    <label className="sub-label">Completed Status
                        <DarkSelectComponent styles={"rounded-md w-full mt-[16px]"} type={CompletedStatus} />
                    </label>
                </div>

                <div className="col-span-3">
                    <BillingDetails id={order && order.userId && order.userId._id && order.userId._id ? order.userId._id : undefined} />
                </div>
            </div>
        )
        // }
    }

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
            {displayPage()}
        </>
    )
}