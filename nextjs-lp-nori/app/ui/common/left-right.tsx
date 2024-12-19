import clsx from "clsx";
import React from "react";

interface Props {
    children: React.ReactNode;
    background?: string;
}

export default function LeftRightComponent(props: Props) {
    const { children, background } = props;
    const bg = `bg-${background}`;

    return (
        <div className={clsx("flex justify-center items-stretch", background && bg)}>
            {React.Children.map(children, child => (
                <div className="w-1/2">
                    {child}
                </div>
            ))}
        </div>
    );
}