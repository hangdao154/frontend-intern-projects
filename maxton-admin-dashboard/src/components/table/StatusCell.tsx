export default function StatusCell(props: { status: boolean | string }) {
    const { status } = props;
    switch (status) {
        case true:
            return (
                <div className="w-fit flex justify-around items-center gap-[6px] px-[12px] py-[4px] bg-green-100 border border-green-600 text-[12px] font-bold text-green-600 rounded-lg">YES
                    <span className="material-symbols-outlined text-[12px] text-green-600">check</span>
                </div>
            )
        case false:
            return (
                <div className="w-fit flex justify-around items-center gap-[6px] px-[12px] py-[4px] bg-red-100 border border-red-600 text-[12px] font-bold text-red-600 rounded-lg">NO
                    <span className="material-symbols-outlined text-[12px] text-red-600">close</span>
                </div>
            )
        case "pending":
            return (
                <div className="w-fit flex justify-around items-center gap-[6px] px-[12px] py-[4px] bg-yellow-100 border border-yellow-600 text-[12px] font-bold text-yellow-600 rounded-lg">PEDNING
                    <span className="material-symbols-outlined text-[12px] text-yellow-600">refresh</span>
                </div>
            )
        case "paid":
            return (
                <div className="w-fit flex justify-around items-center gap-[6px] px-[12px] py-[4px] bg-green-100 border border-green-600 text-[12px] font-bold text-green-600 rounded-lg">PAID
                    <span className="material-symbols-outlined text-[12px] text-green-600">paid</span>
                </div>
            )
        case "confirmed":
            return (
                <div className="w-fit flex justify-around items-center gap-[6px] px-[12px] py-[4px] bg-blue-100 border border-blue-600 text-[12px] font-bold text-blue-600 rounded-lg">CONFIRMED
                    <span className="material-symbols-outlined text-[12px] text-blue-600">check</span>
                </div>
            )
        case "cancelled":
            return (
                <div className="w-fit flex justify-around items-center gap-[6px] px-[12px] py-[4px] bg-red-100 border border-red-600 text-[12px] font-bold text-red-600 rounded-lg">CANCELLED
                    <span className="material-symbols-outlined text-[12px] text-red-600">close</span>
                </div>
            )
    }
}