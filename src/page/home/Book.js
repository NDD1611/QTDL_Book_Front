import './Book.scss'
import { Link } from 'react-router-dom'

function Book({ book }) {
    let addHost = (link) => {
        return process.env.REACT_APP_BACKEND_HOST + link
    }
    return (
        <>
            <Link className='book' to={'detail_book?id=' + book.bookID}>
                <div className='image'>
                    <img src={addHost(book.image)} />
                </div>
                <div className='book_name'>{book.name}</div>
                <div className='book_author'>Tác Giả: {book.tenTacGia}</div>
            </Link>
        </>
    )
}

export default Book;