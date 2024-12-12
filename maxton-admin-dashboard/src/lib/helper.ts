import { MenuItem } from "./interfaces";

export function mapPageLabel(list: MenuItem[], key: string) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].key === key) return list[i].label
        else {
            const children = list[i].children;
            if (children?.length) {
                for (let j = 0; j < children.length; j++) {
                    if (children[j].key === key) {
                        return children[j].label; // Assuming you want the label
                    }
                }
            }
        }
    }
    return null;
}

export function camelCaseToWords(s: string) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export function displayTime(time: Date) {
    return ([time.getMonth(), time.getMonth() + 1, time.getDate()].join("/"))
}

export function displayOrderID(id: number) {
    return id.toString().padStart(4, '0');
}