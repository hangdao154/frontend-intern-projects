import { mapPageLabel } from "../../../lib/helper";
import { menuItems } from "../../../lib/constants";
import PagePath from "../../../components/layout/PagePath";
import { useState } from "react";
import AddProductForm from "./forms/AddProductForm";
import { AddProductSchema } from "../../../lib/schema";


interface Props {
    pageInfo: { key: string, keyPath: string[] },
    editData?: any,
}

export default function AddProductTab(props: Props) {
    const { pageInfo, editData } = props;

    const pathLabels: Array<null | string> = [];
    pageInfo.keyPath.forEach(item => pathLabels.push(mapPageLabel(menuItems, item)));
    pathLabels.reverse();

    return (
        <>
            <div className="flex justify-between items-center">
                <PagePath pathLabels={pathLabels} />
                <div className="btn-group blue-btn gap-[16px]">
                    <button className="pl-[16px] py-[8px] rounded-lg text-[16px]">Settings</button>
                    <button className="material-symbols-outlined">arrow_drop_down</button>
                </div>
            </div>

            <div className="form-container mt-[24px]">
                <AddProductForm />
            </div>
        </>
    )
}