
import './Header.scss'
import { Link } from "react-router-dom"
function Header() {

    return (
        <>
            <div id="header">
                <div className="link">
                    <Link to="/admin/books">Sách</Link>
                </div>
                <div className="link">
                    <Link to="/admin/list_borrow">Danh sách mượn</Link>
                </div>
                <div className="link">
                    <Link to="/admin/image">ảnh</Link>
                </div>
            </div>
        </>
    )
}

export default Header;