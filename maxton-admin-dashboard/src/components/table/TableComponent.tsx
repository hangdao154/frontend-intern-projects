import { ConfigProvider, Spin, Table, TableProps } from "antd";
import { IGetProducts } from "../../modules/test/components/TestProductsTab";
import { useState } from "react";

interface Props {
    isLoading?: boolean,
    columns: TableProps<any>['columns'],
    dataSource: TableProps<IGetProducts>['dataSource'],
    handleSetFilterSort?: (sortInfo: { keyToSort: string, direction: string }) => void
}

export default function TableComponent(props: Props) {
    const { isLoading, columns, dataSource, handleSetFilterSort } = props;

    // while (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center px-auto py-10">
    //             <Spin size="large" />
    //         </div>
    //     )
    // }

    return (
        <div className="bg-[#070c29] p-[16px] rounded-lg mt-[24px]">
            <div style={{ border: "0", padding: "0" }} className="table-container">
                <ConfigProvider theme={{
                    token: {
                        colorBgContainer: "#070C29",
                        colorText: "white",
                    },
                    components: {
                        Table: {
                            headerColor: "black",
                            headerBg: "white",
                            headerBorderRadius: 0,
                            borderColor: "#FFFFFF20",
                            rowHoverBg: "#0F1535",
                            rowSelectedBg: "#0b0f3d",
                            rowSelectedHoverBg: "#101847",
                        }
                    },
                }}>
                    <Table
                        columns={columns}
                        rowKey={record => record._id}
                        dataSource={dataSource}
                        pagination={false}
                        rowSelection={{ type: "checkbox" }}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}