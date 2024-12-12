import { ReactElement, ReactNode, useState } from 'react'
import Header from './components/layout/Header'
import SideMenu from './components/layout/SideMenu'
import ProductsTab from './modules/ecommerce/components/ProductsTab'
import AddProductTab from './modules/ecommerce/components/AddProductTab'
import { useNavigate } from 'react-router-dom'
import Footer from './components/layout/Footer'
import CustomersTab from './modules/ecommerce/components/CustomersTab'
import OrdersTab from './modules/ecommerce/components/OrdersTab'

function App(props: { children?: ReactElement }) {
  const { children } = props;

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<{ key: string, keyPath: string[] }>({ key: "child-add-product", keyPath: ["child-add-product", "ecommerce"] });

  const navigate = useNavigate();

  const toggleMenuClicked = () => {
    setMenuClicked(!menuClicked);
  }

  const handleHovered = (status: boolean) => {
    setCollapsed(!status);
    setHovered(status);
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleSetCurrentPage = (info: { key: string, keyPath: string[] }) => {
    setCurrentPage(info);
  }

  const handleSort = (data: any[], sortInfo: { keyToSort: string, direction: string }) => {
    const keyToSort = sortInfo.keyToSort;
    const direction = sortInfo.direction;
    console.log(typeof (data[0][keyToSort]));

    // Sort the received data based on its type
    switch (typeof (data[0][keyToSort])) {
      case "string":
        return (direction === "asc"
          ? data.sort((a, b) => a[keyToSort].localeCompare(b[keyToSort]))
          : data.sort((a, b) => b[keyToSort].localeCompare(a[keyToSort])))
      case "number":
      case "object":
        return (direction === "asc"
          ? data.sort((a, b) => a[keyToSort] - b[keyToSort])
          : data.sort((a, b) => b[keyToSort] - a[keyToSort]))
      default: return data
    }
  }

  const changePage = (info: { key: string, keyPath: string[] }) => {
    switch (info.key) {
      case "child-products":
        return <ProductsTab pageInfo={info} />
      case "child-add-product":
        return <AddProductTab pageInfo={info} />
      case "child-customers":
        return <CustomersTab pageInfo={info} />
      case "child-orders":
        return <OrdersTab pageInfo={info} />
      default:
        return <ProductsTab pageInfo={info} />
    }
  }

  return (
    <>
      <Header collapsed={collapsed} menuClicked={menuClicked} hovered={hovered} toggleMenuClicked={toggleMenuClicked} toggleCollapsed={toggleCollapsed} />
      <SideMenu collapsed={collapsed} menuClicked={menuClicked} hovered={hovered} handleHovered={handleHovered} handleSetCurrentPage={handleSetCurrentPage} />
      <main className={"min-h-[calc(100vh-70px)] mt-[70px] xs:p-[48px] lg:p-[24px] z-1 " + (collapsed ? "lg:w-[calc(100%-80px)] lg:ml-[80px] xs:w-full xs:ml-0" : "expanded") + (hovered && !menuClicked ? " hovered" : "")}>
        {children}
      </main>
      <div className={'overlay absolute top-0 left-0 w-full h-full bg-[#000000] ' + (collapsed ? 'hidden' : 'xs:opacity-[50%] lg:opacity-0')} onClick={() => {
        toggleCollapsed();
        toggleMenuClicked();
      }}></div>
      {/* <Footer/> */}
      <Footer/>
    </>
  )
}

export default App
