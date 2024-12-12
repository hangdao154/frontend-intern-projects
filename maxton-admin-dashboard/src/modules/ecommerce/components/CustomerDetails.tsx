import { useEffect, useRef } from "react";
import useCustomers from "../hooks/useCustomers";
import { useNavigate, useParams } from "react-router-dom";
import { FacebookFilled, LinkedinFilled, XOutlined, YoutubeFilled } from "@ant-design/icons";
import { notification, Spin } from "antd";
import Table from "../../../components/table/Table";
import { NotificationType } from "../../../lib/interfaces";
import { mapPageLabel } from "../../../lib/helper";
import { menuItems } from "../../../lib/constants";
import PagePath from "../../../components/layout/PagePath";

interface Props {
    pageInfo: { key: string, keyPath: string[] }
}

export default function CustomerDetails(props: Props) {
    const {pageInfo} = props;
    const pathLabels: Array<null | string> = [];
    pageInfo.keyPath.forEach(item => pathLabels.push(mapPageLabel(menuItems, item)));
    pathLabels.reverse();

    const navigate = useNavigate();
    const { id } = useParams();
    const {
        fetchedMsg,
        fetchedData,
        getCustomerByID,
        isLoading
    } = useCustomers();

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current && id) {
            if (id) getCustomerByID(id);
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

        const user = fetchedData?.user;
        const orders = fetchedData?.orders;

        if (user && orders) {
            const hidddenHeaders = ["_id", "__v", "userId", "products"];
            const headers = Object.keys(orders.length > 0 && orders[0]).filter(header => !hidddenHeaders.includes(header));
            return (
                <div className="xs:flex flex-col lg:grid grid-cols-3 gap-[20px]">
                    <div className="profile max-h-[800px] overflow-y-auto flex flex-col justify-between bg-[#070C29] rounded-lg row-span-1">
                        <div className="flex flex-col justify-center p-[16px] rounded-t-lg gap-[30px]">
                            <div className="relative">
                                <img src="src/assets/images/customers/banner.png" className="w-full h-auto rounded-lg" />
                                <img src={user.avatar ? user.avatar : "src/assets/images/customers/1.png"} className="absolute bottom-[-50px] left-[50%] translate-x-[-50%] w-[100px] h-[100px] rounded-[50px] border-[4px] border-white" />
                            </div>
                            <div className="mt-[30px]">
                                <h3 className="text-center text-[24px] font-600">{user.firstName + " " + user.lastName}</h3>
                                <p className="text-center text-[12px]">{ }</p>
                            </div>
                            <div className="mt-[10px] flex justify-center gap-[20px]">
                                <div className="flex justify-center items-center min-w-[48px] w-[48px] h-[48px] rounded-[50%] bg-[#0072B1]">
                                    <LinkedinFilled className="text-[20px] text-white" />
                                </div>
                                <div className="flex justify-center items-center min-w-[48px] w-[48px] h-[48px] rounded-[50%] bg-[#212529]">
                                    <XOutlined className="text-[20px] text-white" />
                                </div>
                                <div className="flex justify-center items-center min-w-[48px] w-[48px] h-[48px] rounded-[50%] bg-[#0866FF]">
                                    <FacebookFilled className="text-[20px] text-white" />
                                </div>
                                <div className="flex justify-center items-center min-w-[48px] w-[48px] h-[48px] rounded-[50%] bg-[#E60023]">
                                    <YoutubeFilled className="text-[20px] text-white" />
                                </div>
                            </div>
                            <div className="flex justify-around">
                                <div>
                                    <p className="text-[20px] text-center">{orders.length}</p>
                                    <p className="text-[12px] text-center">Orders</p>
                                </div>
                                <div>
                                    <p className="text-[20px] text-center">{user.totalPaid ? user.totalPaid : "$$$"}</p>
                                    <p className="text-[12px] text-center">Spent</p>
                                </div>
                                <div>
                                    <p className="text-[20px] text-center">3 Years</p>
                                    <p className="text-[12px] text-center">Membership</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="p-3 bg-[#0F1535] border-t border-[#FFFFFF20]">
                                <p className="text-[14px] font-bold">Address</p>
                                <p className="text-[14px]">{user.address ? user.address : "123 Street Name, City, Australia"}</p>
                            </div>
                            <div className="p-3 bg-[#0F1535] border-t border-[#FFFFFF20]">
                                <p className="text-[14px] font-bold">Email</p>
                                <p className="text-[14px]">{user.email ? user.email : "loading@email.com"}</p>
                            </div>
                            <div className="p-3 bg-[#0F1535] border-t border-[#FFFFFF20] rounded-b-lg">
                                <p className="text-[14px] font-bold">Phone</p>
                                <p className="text-[14px]">{user.phone ? user.phone : "00000000"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="max-h-[800px] col-span-2 card-body flex flex-col gap-y-[10px] row-span-1">
                        <h3 className="text-[18px] font-700">Send Notes to Customer</h3>
                        <textarea className="dark-style rounded-md w-full h-[200px]" placeholder="Send message..."></textarea>
                        <button className="dark-style rounded-md">Add Message</button>
                        <div className="message-container bg-[#171E44] rounded-lg max-h-full overflow-y-auto">
                            <div className="border-b border-[#FFFFFF20] p-4">
                                <p className="opacity-[80%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque incidunt totam consequuntur temporibus soluta ratione aliquid. Vel consequatur non laborum laboriosam exercitationem libero dolorum deserunt officia. Mollitia magnam reprehenderit nemo.</p>
                                <p className="text-right text-[12px] mt-[10px]"><i className="opacity-[50%]">34 minutes ago</i></p>
                            </div>
                            <div className="border-b border-[#FFFFFF20] p-4">
                                <p className="opacity-[80%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque incidunt totam consequuntur temporibus soluta ratione aliquid. Vel consequatur non laborum laboriosam exercitationem libero dolorum deserunt officia. Mollitia magnam reprehenderit nemo.</p>
                                <p className="text-right text-[12px] mt-[10px]"><i className="opacity-[50%]">34 minutes ago</i></p>
                            </div>
                            <div className="border-b border-[#FFFFFF20] p-4">
                                <p className="opacity-[80%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque incidunt totam consequuntur temporibus soluta ratione aliquid. Vel consequatur non laborum laboriosam exercitationem libero dolorum deserunt officia. Mollitia magnam reprehenderit nemo.</p>
                                <p className="text-right text-[12px] mt-[10px]"><i className="opacity-[50%]">34 minutes ago</i></p>
                            </div>
                            <div className="border-b border-[#FFFFFF20] p-4">
                                <p className="opacity-[80%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque incidunt totam consequuntur temporibus soluta ratione aliquid. Vel consequatur non laborum laboriosam exercitationem libero dolorum deserunt officia. Mollitia magnam reprehenderit nemo.</p>
                                <p className="text-right text-[12px] mt-[10px]"><i className="opacity-[50%]">34 minutes ago</i></p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#070c29] p-[16px] rounded-lg mt-[24px] col-span-3">
                        <div className="table-container">
                            <p className="text-[24px] mb-[20px]">{`Orders (${fetchedData.orders.length})`}</p>
                            <Table data={fetchedData.orders} headers={headers} hasActions={false}/>
                        </div>
                    </div>
                </div>
            )
        }
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