import './Header.scss'
import logo from '../../image/fahasa_logo.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Header() {
    let navigate = useNavigate()
    let [info, setInfo] = useState()
    let [reRender, setReRender] = useState(false)
    useEffect(() => {
        let login = JSON.parse(localStorage.getItem('login'))
        if (login) {
            setInfo(login)
        } else {
            setInfo(undefined)
        }
    }, [reRender])

    let handleLogout = () => {
        localStorage.removeItem('login')
        setReRender(!reRender)
    }
    let handleLogin = () => {
        navigate('/login')
    }
    return (
        <>
            <div id="Header">
                <div className='bottom'>
                    <div className='logo'>
                        <img src={logo} />
                    </div>
                    <div className='search'>
                        <input className='input_search' placeholder='Tìm kiếm sản phẩm mong muốn' />
                        <button className='btn_search'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div className='account'>
                        <div>
                            <i className="fa-regular fa-user"></i>
                        </div>
                        <div className='account'>Tài khoản
                            <div className='drop_down'>
                                <div className='login' onClick={() => { handleLogin() }}>Đăng nhập</div>
                                <div className='logout' onClick={() => { handleLogout() }}>Đăng xuất</div>
                            </div>
                        </div>
                    </div>
                    <div className={info ? 'welcome' : 'display_none'}>Xin chào, {info ? info.lastName + ' ' + info.firstName : ''}</div>
                </div>
            </div>
        </>
    )
}

export default Header;