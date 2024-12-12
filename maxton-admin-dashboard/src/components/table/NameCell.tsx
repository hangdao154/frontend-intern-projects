interface Props {
    name: string,
    imgURL?: string,
    category?: string,
}

export default function NameCell(props: Props) {
    const { name, imgURL, category } = props;

    if (category) {
        return (
            <div className="min-w-[300px] flex justify-start gap-[30px]">
                <div className="w-[80px] h-[60px] rounded-lg">
                    <img className="w-full h-full rounded-lg object-cover" src={imgURL} />
                </div>
                <div>
                    <h4 className="font-bold">{name}</h4>
                    <p className="capitalize">Category: {category}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="min-w-[200px] flex justify-start items-center gap-[10px]">
                <div className="w-[50px] h-[50px] rounded-[50%]">
                    <img className="w-full h-full rounded-[50%] object-cover" src={imgURL} />
                </div>
                <p className="font-bold text-[14px]">{name}</p>
            </div>
        )
    }
}