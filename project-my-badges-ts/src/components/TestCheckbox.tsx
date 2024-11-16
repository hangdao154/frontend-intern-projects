import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import { useState } from "react";

interface Props {
    headers: string[]
}

export default function TestCheckbox(props: Props) {
    const { headers } = props;

    const [disabledList, setDisabledList] = useState<string[]>([])
    const [applyColsToDisplay, setApplyColsToDisplay] = useState<string[]>([])

    const handleAddCol = (name: string) => {
        setApplyColsToDisplay(prev => {
            const newCols: string[] = [...prev, name];

            if (newCols.length >= 4) {
                const newDisabledList = headers.filter(item => !newCols.includes(item));
                setDisabledList(newDisabledList);
            } else {
                setDisabledList([]);
            }

            return newCols;
        });
    }

    const handleDeleteCol = (name: string) => {
        setApplyColsToDisplay(prev => {
            const newCols: string[] = prev.filter(item => item !== name);

            if (newCols.length >= 4) {
                const newDisabledList = headers.filter(item => !newCols.includes(item));
                setDisabledList(newDisabledList);
            } else {
                setDisabledList([]);
            }

            return newCols;
        });
    }

    const onChange = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            handleAddCol(String(e.target.name));
        } else {
            handleDeleteCol(String(e.target.name));
        }
    }

    // const onChange = (e: CheckboxChangeEvent) => {
    //     //For individual checkboxes
    //     // If checked -> Add current header to applyColsToDisplay (keep the order)
    //     console.log(e.target.name);
    //     console.log(e.target.checked);
    //     if (e.target.checked) {
    //         if (!applyColsToDisplay.includes(String(e.target.name))) {
    //             const newColsToDisplay: string[] = [...applyColsToDisplay, e.target.name];
    //             console.log(newColsToDisplay);
    //             setApplyColsToDisplay(newColsToDisplay);
    //             console.log(applyColsToDisplay);
    //             if (applyColsToDisplay.length >= 4) {
    //                 const newDisabledList: string[] = headers.filter(item => !applyColsToDisplay.includes(item));
    //                 setDisabledList(newDisabledList);
    //             }
    //         }
    //     } else {
    //         if (applyColsToDisplay.includes(String(e.target.name))) {
    //             const newColsToDisplay: string[] = applyColsToDisplay.filter(item => item !== e.target.name);
    //             console.log(newColsToDisplay);
    //             setApplyColsToDisplay(newColsToDisplay);
    //             console.log(applyColsToDisplay);
    //             if (applyColsToDisplay.length < 4) {
    //                 setDisabledList([]);
    //             }
    //         }
    //     }
    //     // If not checked -> Remove current header from applyColsToDisplay (keep the order)
    // }

    // const onChange = (e: CheckboxChangeEvent) => {
    //     const { name, checked } = e.target;

    //     setApplyColsToDisplay((prev) => {
    //         let newColsToDisplay: string[];

    //         if (checked) {
    //             // Add the checkbox's name to the array
    //             newColsToDisplay = [...prev, name];
    //         } else {
    //             // Remove the checkbox's name from the array
    //             newColsToDisplay = prev.filter((item) => item !== name);
    //         }

    //         // Update the disabled list based on the new state
    //         if (newColsToDisplay.length >= 4) {
    //             const newDisabledList = headers.filter((item) => !newColsToDisplay.includes(item));
    //             setDisabledList(newDisabledList);
    //         } else {
    //             setDisabledList([]);
    //         }

    //         return newColsToDisplay;
    //     });
    // };

    return (
        headers.map((header, index) => (
            <Checkbox key={index} name={header} onChange={onChange} disabled={disabledList.includes(header) ? true : false}>{header}</Checkbox>
        ))
    )
}