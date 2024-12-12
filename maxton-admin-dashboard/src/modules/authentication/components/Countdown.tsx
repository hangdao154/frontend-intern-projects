import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function Countdown(props: {time: number}) {
    const { time } = props;
    const [timeLeft, setTimeLeft] = useState(time);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev > 0) return prev - 1;
                return prev;
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, [time]);

    return (
        <div className="relative w-fit">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
            <p className="absolute top-[8px] left-[9px] text-center text-[12px]">{String(timeLeft).padStart(2, "0")}</p>
        </div>
    )
}