import { useEffect, useRef } from "react";
import useCustomers from "../hooks/useCustomers";
import { Spin } from "antd";

interface Props {
    id?: string
}

export default function BillingDetails(props: Props) {
    const { id } = props;
    const { getCustomerByID, fetchedData, isLoading } = useCustomers();
    const isFirstRender = useRef(true);

    useEffect(() => {
        console.log('ID:', id);
        
        if (!isFirstRender.current && id) {
            getCustomerByID(id);
        }
        isFirstRender.current = false; // Set after the first render
    }, [])

    useEffect(() => {
        console.log(fetchedData);
        
    }, [fetchedData])

    while (isLoading) {
        return <div className="flex justify-center items-center px-auto"><Spin size="large" /></div>
    }

    if (fetchedData && fetchedData.user) {
        const user = fetchedData.user

        return (
            <>
                <h4 className="text-[24px] font-[500]">Billing Details</h4>
                <div className="card-body w-full xs:flex flex-col lg:grid grid-cols-4 gap-[14px] mt-[20px]">
                    <div className="card-body border border-[#FFFFFF20]">
                        <div className="flex gap-[16px] items-start">
                            <span className="material-symbols-outlined mt-[6px] text-white text-[32px]">account_circle</span>
                            <div>
                                <p className="font-[500]">Customer Name</p>
                                <p className="text-[#0D6EFD]">{user.firstName + " " + user.lastName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body border border-[#FFFFFF20]">
                        <div className="flex gap-[16px] items-start">
                            <span className="material-symbols-outlined mt-[6px] text-white text-[32px]">mail</span>
                            <div className="truncate">
                                <p className="font-[500]">Email</p>
                                <p className="text-[#0D6EFD]">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body border border-[#FFFFFF20]">
                        <div className="flex gap-[16px] items-start">
                            <span className="material-symbols-outlined mt-[6px] text-white text-[32px]">phone</span>
                            <div>
                                <p className="font-[500]">Phone</p>
                                <p className="text-[#0D6EFD]">{user.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body border border-[#FFFFFF20]">
                        <div className="flex gap-[16px] items-start">
                            <span className="material-symbols-outlined mt-[6px] text-white text-[32px]">event</span>
                            <div>
                                <p className="font-[500]">Shipping Date</p>
                                <p className="text-[#0D6EFD]">Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}