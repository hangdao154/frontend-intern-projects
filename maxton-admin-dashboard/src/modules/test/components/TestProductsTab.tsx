import { displayTime, mapPageLabel } from "../../../lib/helper";
import { menuItems } from "../../../lib/constants";
import PagePath from "../../../components/layout/PagePath";
import DarkButton from "../../../components/buttons/DarkButton";
import { ReactElement, useEffect, useRef, useState } from "react";
import { GetProductQueries, NotificationType } from "../../../lib/interfaces";
import useProducts from "../../ecommerce/hooks/useProducts";
import { Category, Vendor } from "../../ecommerce/constants";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import TagCell from "../../../components/table/TagCell";
import FilledButton from "../../../components/buttons/FilledButton";
import NameCell from "../../../components/table/NameCell";
import TestTable from "./TestTable";
import Pagination from "../../../components/pagination/pagination";
import FilterGroup from "../../ecommerce/components/FilterGroup";

interface Props {
    pageInfo: { key: string, keyPath: string[] },
}

export interface IGetProducts {
    _id: string,
    title: string,
    image: string,
    price: number,
    salePrice?: number,
    category: string,
    collection: string,
    vendor: string,
    tags: string[],
    isActive: boolean,
    isDeleted: boolean,
    deletedAt: string | null,
    createdAt: string,
    updatedAt: string,
    __v: number
}

const testData = {
    products: [
        {
            _id: "wuqe9p34u732ysldjfsdahfip839q27",
            title: "Leather Wallet",
            price: 39,
            salePrice: 59,
            image: "https://res.cloudinary.com/das4tikiy/image/upload/v1733113543/products/09e8356f-2296-4068-b3db-2601d84279ca_1733113542270.webp",
            vendor: "amazone",
            category: "topwear",
            collection: "men",
            tags: [
                "leather",
                "lifestyle",
                "men",
                "brown"
            ],
            isActive: true,
            isDeleted: false,
            deletedAt: null,
            createdAt: "2024-12-02T04:25:44.967Z",
            updatedAt: "2024-12-02T04:25:44.967Z",
            __v: 0
        },
        {
            _id: "ashd8qyeralksjdf8ed32047weksdfh",
            title: "Leather Wallet",
            price: 39,
            salePrice: 59,
            image: "https://res.cloudinary.com/das4tikiy/image/upload/v1733113543/products/09e8356f-2296-4068-b3db-2601d84279ca_1733113542270.webp",
            vendor: "amazone",
            category: "topwear",
            collection: "men",
            tags: [
                "leather",
                "lifestyle",
                "men",
                "brown"
            ],
            isActive: true,
            isDeleted: false,
            deletedAt: null,
            createdAt: "2024-12-02T04:25:44.967Z",
            updatedAt: "2024-12-02T04:25:44.967Z",
            __v: 0
        }
    ],
    totalProducts: 16,
    pages: 4
}

export default function TestProductsTab(props: Props) {
    const { pageInfo } = props;
    const pathLabels = pageInfo.keyPath.map(item => (mapPageLabel(menuItems, item))).reverse();


    const [filter, setFilter] = useState<GetProductQueries>({ page: 1, limit: 10 })
    const [selectedItem, setSelectedItem] = useState<string | undefined>()
    const { getProducts, fetchedData, isLoading, fetchedMsg, deleteProduct } = useProducts();
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
        setFilter({ ...filter, sortKey: sortInfo.keyToSort, sortValue: sortInfo.direction })
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
        const status = fetchedMsg?.code;
        if (status !== undefined) {
            if (status < 200 || status >= 300) {
                openNotificationWithIcon('error');
                // Navigate to login page when access token expired
                if (status === 401) {
                    setTimeout(() => {
                        return navigate("/login")
                    }, 1000)
                }
            }

        }
    }, [fetchedMsg])

    const columns: Array<{ key: string, title: string, render: (dataObj: IGetProducts) => ReactElement }> = [
        {
            key: '_id',
            title: 'ID',
            render: (dataObj) => {
                return (
                    <div>
                        <span className="text-primary-blue">
                            {dataObj._id.slice(0, 3) + "..." + dataObj._id.slice(-4, -1)}
                        </span>
                    </div>
                )
            }
        },
        {
            key: 'title',
            title: "TITLE",
            render: (dataObj: IGetProducts) => {
                return (
                    <NameCell name={dataObj.title} imgURL={dataObj.image} category={dataObj.category} />
                )
            }
        },
        {
            title: 'PRICE',
            key: 'price',
            render: (dataObj: IGetProducts) => (
                <div className="text-white">${dataObj.price}</div>
            )
        },
        {
            title: 'TAGS',
            key: 'tags',
            render: (dataObj) => (
                <TagCell data={dataObj.tags} />
            )
        },
        {
            title: 'CATEGORY',
            key: 'category',
            render: (dataObj) => (
                <div className="capitalize text-white">{dataObj.category}</div>
            )
        },
        {
            title: 'COLLECTION',
            key: 'collection',
            render: (dataObj) => (
                <div className="capitalize text-white">{dataObj.collection}</div>
            )
        },
        {
            title: 'VENDOR',
            key: 'vendor',
            render: (dataObj) => (
                <div className="capitalize text-white">{dataObj.vendor}</div>
            )
        },
        {
            title: 'LAST UPDATE',
            key: 'updatedAt',
            render: (dataObj) => (
                <div className="text-white">{displayTime(new Date(dataObj.updatedAt))}</div>
            )
        },
        {
            title: 'ACTIONS',
            key: 'actions',
            render: (dataObj) => (
                <div className="relative">
                    <DarkButton content="..." otherStyles="rounded-lg mx-auto" onClick={() => {
                        if (selectedItem !== dataObj._id) setSelectedItem(dataObj._id)
                        else setSelectedItem(undefined)
                    }} />
                    <div className={"absolute top-[50px] right-0 z-[1000] flex flex-col justify-start shadow-md" + (selectedItem === (dataObj._id) ? "" :
                        " hidden")}>
                        <a href={`/update-product/${dataObj._id}`}>
                            <DarkButton name={dataObj["_id"]} content="Update" otherStyles="rounded-t-lg" />
                        </a>
                        <DarkButton name={dataObj["_id"]} content="Delete" otherStyles="rounded-b-lg" onClick={() => { () => deleteProduct(dataObj._id) }} />
                    </div>
                </div>
            ),
        }
    ]


    return (
        <>
            {contextHolder}

            <div className="flex flex-wrap justify-between items-center">
                <PagePath pathLabels={pathLabels} />
                <FilledButton content="Settings" iconR="arrow_drop_down" active={true} otherStyle="bg-primary-blue" />
            </div>

            <FilterGroup selectTypes={[Category, Vendor]} handleSetFilter={handleSetFilter} />

            <TestTable
                isLoading={isLoading}
                // dataSource={fetchedData && fetchedData.products}
                data={testData.products}
                columns={columns}
                handleSetFilterSort={handleSetFilterSort}
                hasActions={true}
            />

            <Pagination handleSetFilter={handleSetFilter} totalPages={fetchedData && fetchedData.pages ? fetchedData.pages : 1} currentPage={filter.page} />
        </>
    )
}