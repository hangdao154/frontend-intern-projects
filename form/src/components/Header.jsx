import { Button } from 'antd'

export default function Header(props) {
    const { handleChangePage } = props;

    return (
        <div className="page-selection">
            <Button type="dashed" onClick={() => handleChangePage("LOGIN")}>LOGIN</Button>
            <Button type="dashed" onClick={() => handleChangePage("REGISTER")}>REGISTER</Button>
            <Button type="dashed" onClick={() => handleChangePage("FORGOT-PASSWORD")}>FORGOT PASSWORD</Button>
            <Button type="dashed" onClick={() => handleChangePage("CHANGE-PASSWORD")}>CHANGE PASSWORD</Button>
            <Button type="dashed" onClick={() => handleChangePage("TODO-LIST")}>TODO-LIST</Button>
        </div>
    )
}