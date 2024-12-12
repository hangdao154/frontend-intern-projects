import { ReactElement } from 'react'

interface Props {
    children: ReactElement,
}

export default function AuthenticationComponent(props: Props) {
    const { children } = props;

    const gradient: string = "bg-gradient-to-r from-[#7928ca] from-25% via-[#ff0080] via-50% via-[#04e09a] via-70% to-[#e0d504]"

    return (
        <main className='w-full my-[100px] flex items-center justify-center'>
            <div className={"h-[20x] w-[40%] min-w-[400px] rounded-[20px] " + gradient}>
                {children}
            </div>
        </main>
    )
}