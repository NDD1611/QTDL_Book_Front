import './ListBorrow.scss'
import Header from '../../component/Header'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'
import axios from '../../axios'
function ListBorrow() {
    let [list, setList] = useState([])
    let getData = async () => {
        let rs = await axios.get('/list_borrow')
        setList(rs)
    }
    useEffect(() => {
        getData()
    }, [])

    let parseNgayMuon = (str) => {
        let date = new Date(parseInt(str))
        let day = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
        return day
    }
    return (
        <>
            <Header />
            <div className='list_borrow'>
                <div>Danh sách mượn</div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Tên sách</th>
                            <th>Ngày mượn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((obj, index) => {
                                console.log(obj)
                                let { ngayMuon, name, image, firstName, lastName } = obj
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{firstName}</td>
                                        <td>{lastName}</td>
                                        <td>{name}</td>
                                        <td>{parseNgayMuon(ngayMuon)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>

        </>
    )
}

export default ListBorrow;