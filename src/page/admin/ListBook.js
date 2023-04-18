
import "./ListBook.scss"
import Header from '../../component/Header'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { toast, ToastContainer } from 'react-toastify';

function ListBook() {

    let [listBooks, setListBooks] = useState([])
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    let [loaiSachs, setLoaiSachs] = useState([])
    let [infoBook, setInfoBook] = useState({
        name: '',
        nopage: '',
        image: '',
        nhaXuatBan: '',
        tenTacGia: '',
        moTa: '',
        sl: '',
        loaiSach_loaiID: ''
    })

    useEffect(() => {
        getData()
    }, [])

    let getData = async () => {
        let res = await axios.get('/all-book')
        res = [...res].reverse()
        let response = await axios.get("/all-loai-sach")
        setLoaiSachs(response)
        setListBooks(res)
    }
    let addHost = (link) => {
        return process.env.REACT_APP_BACKEND_HOST + link
    }

    let deleteBook = async (book) => {
        let res = await axios.delete('/book', { data: book })
        if (res.err == 0) {
            toast.success("Xóa sách thành công", {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            toast.error("Xóa sách thất bại", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        getData()
    }
    let handleSetInfoBook = (e, field) => {
        let { value } = e.target
        let copyData = { ...infoBook }
        copyData[field] = value
        console.log(copyData)
        setInfoBook(copyData)
    }

    let handleEdit = (book) => {
        handleShow()
        setInfoBook(book)
    }
    let handleUpdate = async (e) => {
        e.preventDefault();
        let rs = await axios.put('/book', infoBook)
        if (rs.err == 0) {
            toast.success("Cập nhật thành công", {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            toast.error("cập nhật thất bại", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        setShow(false)
        setInfoBook({
            name: '',
            nopage: '',
            image: '',
            nhaXuatBan: '',
            tenTacGia: '',
            moTa: '',
            sl: '',
            loaiSach_loaiID: ''
        })
        getData()
    }

    let getNameBook = (ma) => {
        for (let loai of loaiSachs) {
            if (loai.loaiID === ma) {
                return loai.name
            }
        }
    }
    return (
        <>
            <Header />
            <div id="my_modal" className={show ? '' : 'hide'}>
                <div className="edit_book">
                    <form >
                        <div className="close_modal" onClick={() => { setShow(false) }}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div>Cập nhật thông tin:</div>
                        <div className=''>
                            <label>Tên sách:</label>
                            <input type="text" required id="asha" name='akjk'
                                value={infoBook.name} onChange={(e) => { handleSetInfoBook(e, 'name') }} />
                        </div>

                        <div className=''>
                            <label>Số Trang:</label>
                            <input type="number" required
                                value={infoBook.nopage} onChange={(e) => { handleSetInfoBook(e, 'nopage') }} />
                        </div>
                        <div className=''>
                            <label>Số lượng:</label>
                            <input type="number" required
                                value={infoBook.sl} onChange={(e) => { handleSetInfoBook(e, 'sl') }} />
                        </div>
                        <div className=''>

                            <label>Ảnh:</label>
                            <input type="text" required
                                value={infoBook.image} onChange={(e) => { handleSetInfoBook(e, 'image') }} />
                        </div>

                        <div className=''>
                            <label>Nhà xuất bản:</label>
                            <input type="text" required
                                value={infoBook.nhaXuatBan} onChange={(e) => { handleSetInfoBook(e, 'nhaXuatBan') }} />
                        </div>
                        <div className=''>
                            <label>Tên tác giả:</label>
                            <input type="text" required
                                value={infoBook.tenTacGia} onChange={(e) => { handleSetInfoBook(e, 'tenTacGia') }} />
                        </div>

                        <div className=''>
                            <label>Loại sách:</label>
                            <select name="loaiSach" onChange={(e) => { handleSetInfoBook(e, 'loaiSach_loaiID') }}>
                                {
                                    loaiSachs.map((loai) => {
                                        return (
                                            <option key={loai.loaiID} value={loai.loaiID}>{loai.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <label className='mota'>Mô tả:</label>
                        <textarea type="text_area"
                            value={infoBook.moTa} onChange={(e) => { handleSetInfoBook(e, 'moTa') }} required />

                        <button onClick={(e) => { handleUpdate(e) }}>Cập nhật</button>
                    </form >
                </div >
            </div>


            <div id="Book">
                <Link to="/admin/add-book" className="add_book">
                    Thêm sách
                </Link>

                <div className="my_table">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tên sách</th>
                                <th>Thể loại</th>
                                <th>Tác giả</th>
                                <th>Nhà sản xuất</th>
                                <th>Số lượng</th>
                                <th>Ảnh bìa</th>
                                <th>btn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listBooks.map((book, index) => {
                                    return (
                                        <tr key={book.bookID}>
                                            <td>{book.name}</td>
                                            <td>{getNameBook(book.loaiSach_loaiID)}</td>
                                            <td>{book.tenTacGia}</td>
                                            <td>{book.nhaXuatBan}</td>
                                            <td>{book.sl}</td>
                                            <td>
                                                <div className="image">
                                                    <img src={addHost(book.image)} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="btn" onClick={() => { deleteBook(book) }}>
                                                    <i className="fa-solid fa-trash delete"></i>
                                                </div>
                                                <div className="btn" onClick={() => { handleEdit(book) }}>
                                                    <i className="fa-solid fa-pen-to-square edit"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div >
        </>
    )
}

export default ListBook