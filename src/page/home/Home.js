
import './Home.scss'
import Header from './Header'
import { useState, useEffect } from 'react'
import axios from '../../axios'
import Book from './Book'

function Home() {

    let [loaiSachs, setLoaiSachs] = useState([])
    let [listBooks, setListBooks] = useState([])
    let [listShows, setListShows] = useState([])
    let [filter, setFilter] = useState('ALL')
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (filter === 'ALL') {
            setListShows(listBooks)
        } else {
            let newList = listBooks.filter((book) => {
                return filter === book.loaiSach_loaiID
            })
            setListShows(newList)
        }
    }, [filter])

    let getData = async () => {
        try {
            let response = await axios.get("/all-loai-sach")
            let res = await axios.get('/all-book')
            setListBooks(res)
            setListShows(res)
            setLoaiSachs(response)
        } catch (e) {
            console.log(e)
        }
    }
    let handleFilter = (loaiID) => {
        if (filter === loaiID) {
            setFilter('ALL')
        } else {
            setFilter(loaiID)
        }
    }
    let countBook = (loaiID) => {
        let newLists = listBooks.filter((book) => {
            return loaiID === book.loaiSach_loaiID
        })
        return newLists.length
    }
    return (
        <>
            <Header />
            <div id='main'>
                <div className='left'>
                    {
                        loaiSachs.map((loai) => {
                            return (
                                <div key={loai.loaiID} className={filter === loai.loaiID ? 'bg_yellow type_book' : 'type_book'} onClick={() => { handleFilter(loai.loaiID) }}>
                                    {loai.name}
                                    <span className="quantity_book">{countBook(loai.loaiID)}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='right'>
                    {
                        listShows.map((book) => {
                            return (
                                <Book key={book.bookID} book={book} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home;