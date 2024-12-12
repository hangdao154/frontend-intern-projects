import SearchBar from "../SearchBar"

interface Props {
    collapsed: boolean;
    menuClicked: boolean;
    hovered: boolean;
    toggleMenuClicked: () => void;
    toggleCollapsed: () => void;
}

export default function Header(props: Props) {
    const { collapsed, hovered, menuClicked, toggleMenuClicked, toggleCollapsed } = props;

    return (
        <header className={"backdrop-blur-md border-b border-slate-700 " + (collapsed ? "lg:w-[calc(100%-79px)] lg:left-[80px] xs:w-full xs:left-0" : "expanded") + (hovered && !menuClicked ? " hovered" : "")}>
            <nav className="navbar h-[70px] flex items-center gap-[24px] px-[24px]">
                <button className="material-symbols-outlined" onClick={() => {
                    toggleMenuClicked();
                    toggleCollapsed();
                }}>menu</button>
                <SearchBar onSearch={() => { }} placeholder="Search" rounded="rounded-full" />
                <ul className="flex gap-[24px] align-center">
                    <li>
                        <img className="h-[30px] min-w-[30px]" src="src/assets/images/country/01.png" />
                    </li>
                    <li>
                        <span className="material-symbols-outlined">done_all</span>
                    </li>
                    <li>
                        <span className="material-symbols-outlined">apps</span>
                    </li>
                    <li>
                        <span className="material-symbols-outlined">notifications</span>
                    </li>
                    <li>
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </li>
                </ul>
            </nav>
        </header>
    )
}