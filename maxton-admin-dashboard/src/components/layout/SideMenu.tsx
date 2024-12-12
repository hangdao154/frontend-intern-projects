import { ConfigProvider, Menu } from 'antd';
import { menuItems } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
    collapsed: boolean;
    menuClicked: boolean;
    hovered: boolean;
    handleHovered: (status: boolean) => void;
    handleSetCurrentPage: (info: { key: string, keyPath: string[] }) => void;
}


export default function SideMenu(props: Props) {
    const { collapsed, menuClicked, hovered, handleHovered, handleSetCurrentPage } = props;
    const navigate = useNavigate();
    const authPages: string[] = ['login', 'register', 'forgot-password', 'change-password'];

    return (
        <aside className={"flex-col justify-center " + (collapsed ? "w-[80px] xs:left-[-80px] lg:left-0" : "w-[257px]") + (hovered ? " z-50" : "")}
            onMouseOver={() => {
                handleHovered(true)
            }}
            onMouseOut={() => {
                menuClicked ? () => { } : handleHovered(false)
            }}>
            <div className="flex justify-center items-center gap-[20px] py-[20px]">
                <img className="max-w-[50px]" src="src/assets/images/maxton-logo.png" />
                {!collapsed && <h1 className="text-white text-[28px] font-semibold">Maxton</h1>}
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            iconSize: 24,
                            collapsedIconSize: 24
                        },
                    },
                }}
            >
                <Menu
                    defaultSelectedKeys={['ecommerce']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={menuItems}
                    onClick={(info) => {
                        if (info.key === 'logout') {
                            localStorage.removeItem('accessToken');
                            return navigate('/login')
                        }
                        return navigate(`/${info.key}`)
                    }}
                />
            </ConfigProvider>
        </aside>
    );
};