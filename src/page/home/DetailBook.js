import './DetailBook.scss'
import Header from './Header'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../../axios'
import { toast } from 'react-toastify';
function DetailBook() {

    const navigate = useNavigate();

    let [infoBook, setInfoBook] = useState({})
    let [reRender, setReRender] = useState(false)

    let getData = async () => {
        let search = new URLSearchParams(window.location.search)
        let id = search.get('id')
        let rs = await axios.get(`/book/${id}`)
        setInfoBook(rs)
    }

    useEffect(() => {
        getData()
    }, [reRender])

    let addHost = (link) => {
        return process.env.REACT_APP_BACKEND_HOST + link
    }
    let checkLogin = () => {
        let login = JSON.parse(localStorage.getItem('login'))
        if (login) {
            return true
        } else {
            return false
        }
    }
    let borrowBook = async () => {
        let check = checkLogin()
        if (check) {
            if (window.confirm("Bạn muốn mượn sách")) {
                let login = JSON.parse(localStorage.getItem('login'))
                let date = new Date()
                let time = date.getTime().toString()
                let data = {
                    timeBorrow: time,
                    userID: login.userID,
                    bookID: infoBook.bookID
                }
                let rs = await axios.post('/borrow_book', data)
                if (rs && rs.err === 0) {
                    toast.success("Bạn dã đăng ký mượn sách thành công")
                    setReRender(!reRender)
                } else {
                    toast.warning(rs.mes)
                }
            }
        } else {
            toast.warning("Bạn vui lòng đăng nhập để sử dụng chức năng này")
            navigate('/login')
        }
    }
    let backHome = () => {
        navigate("/")
    }
    return (
        <>
            <Header />
            <div className='main_detail'>
                <div className='left'>
                    <img src={addHost(infoBook.image)} />
                </div>
                <div className='right'>
                    <div >{infoBook.name}</div>
                    <div>Nhà xuất bản: {infoBook.nhaXuatBan}</div>
                    <div>Tác giả: {infoBook.tenTacGia}</div>
                    <div>Số trang: {infoBook.nopage}</div>
                    <div>Số lượng: {infoBook.sl}</div>
                    <div>
                        <button className='btn_borrow' onClick={() => { borrowBook() }}>Đăng kí mượn</button>
                        <button className='btn_borrow back_home' onClick={() => { backHome() }}>Trang chủ</button>
                    </div>
                </div>
            </div>

            <div className='moTa'>{infoBook.moTa}</div>
        </>
    )
}
export default DetailBook;