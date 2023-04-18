import './AddBook.scss'
import Header from '../../component/Header'
import axios from '../../axios'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function AddBook() {

    let [loaiSachs, setLoaiSachs] = useState([])
    let [infoBook, setInfoBook] = useState({
        name: '',
        nopage: '220',
        image: '',
        nhaXuatBan: 'Thế Giới',
        tenTacGia: '',
        moTa: '',
        sl: '10',
        loaiSach: ''
    })
    useEffect(() => {
        getData()
    }, [])


    let getData = async () => {
        try {
            let response = await axios.get("/all-loai-sach")
            setLoaiSachs(response)
        } catch (e) {
            console.log(e)
        }
    }

    let handleSetInfoBook = (e, field) => {
        let { value } = e.target
        let copyData = { ...infoBook }
        copyData[field] = value
        setInfoBook(copyData)
    }
    let saveBook = async (e) => {
        e.preventDefault();
        try {
            console.log(infoBook)
            let response = await axios.post('/book', {
                data: infoBook
            })
            toast.success("Thêm mới sách thành công", {
                position: toast.POSITION.TOP_RIGHT
            })
            setInfoBook({
                name: '',
                nopage: '220',
                image: '',
                nhaXuatBan: 'Thế Giới',
                tenTacGia: '',
                sl: '10',
                moTa: '',
                loaiSach: ''
            })
        } catch (e) {
            console.log(e)
            toast.error("Thêm mới sách thất bại", {
                position: toast.POSITION.TOP_RIGHT
            })
        }
    }

    return (
        <>
            <Header />
            <div id="add_book">
                <ToastContainer />
                <div>Nhập thông tin sách:</div>
                <form >
                    <div className='row'>
                        <div className='width-50'>
                            <label>Tên sách:</label>
                            <input type="text" required id="asha" name='akjk'
                                value={infoBook.name} onChange={(e) => { handleSetInfoBook(e, 'name') }} />
                        </div>
                        <div className='width-50'>
                            <label>Số Trang:</label>
                            <input type="number" required
                                value={infoBook.nopage} onChange={(e) => { handleSetInfoBook(e, 'nopage') }} />
                        </div>
                        <div className='width-50'>
                            <label>Số lượng:</label>
                            <input type="number" required
                                value={infoBook.sl} onChange={(e) => { handleSetInfoBook(e, 'sl') }} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='width-50'>
                            <label>Ảnh:</label>
                            <input type="text" required
                                value={infoBook.image} onChange={(e) => { handleSetInfoBook(e, 'image') }} />
                        </div>
                        <div className='width-50'>
                            <label>Nhà xuất bản:</label>
                            <input type="text" required
                                value={infoBook.nhaXuatBan} onChange={(e) => { handleSetInfoBook(e, 'nhaXuatBan') }} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='width-50'>
                            <label>Tên tác giả:</label>
                            <input type="text" required
                                value={infoBook.tenTacGia} onChange={(e) => { handleSetInfoBook(e, 'tenTacGia') }} />
                        </div>
                        <div className='width-50'>
                            <label>Loại sách:</label>
                            <select name="loaiSach" value={infoBook.loaiSach} onChange={(e) => { handleSetInfoBook(e, 'loaiSach') }}>
                                <option defaultValue>Choose...</option>
                                {
                                    loaiSachs.map((loai) => {
                                        return (
                                            <option key={loai.loaiID} value={loai.loaiID}>{loai.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className='mota'>Mô tả:</label>
                        <textarea type="text"
                            value={infoBook.moTa} onChange={(e) => { handleSetInfoBook(e, 'moTa') }} required />
                    </div>
                    <div>
                        <button className='add' onClick={(e) => { saveBook(e) }}>Lưu</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddBook