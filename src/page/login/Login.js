import { Link } from 'react-router-dom'
import './Login.scss'
import { useState } from 'react'
import axios from '../../axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Login() {
    let [userName, setUserName] = useState('')
    let [passWord, setPassWord] = useState('')
    let navigate = useNavigate()

    let handleSubmit = async () => {
        let rs = await axios.post('/login', { userName, passWord })
        if (rs && rs.err !== 0) {
            toast.error(rs.mes)
        } else {
            let data = JSON.stringify(rs.data)
            localStorage.setItem('login', data)
            toast.success('Bạn đã đăng nhập thành công')
            navigate("/")
        }
    }
    return (
        <div className="container">
            <div className="top">
                <h1 id="title" className="hidden"><span id="logo">Daily <span>UI</span></span></h1>
            </div>
            <div className="login-box animated fadeInUp">
                <div className="box-header">
                    <h2>Log In</h2>
                </div>
                <label htmlFor="username">Username</label>
                <br />
                <input type="text" id="username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input type="password" id="password" value={passWord} onChange={(e) => { setPassWord(e.target.value) }} />
                <br />
                <button type="submit" onClick={() => { handleSubmit() }}>Sign In</button>
                <br />
                <p className="small">Need an account? <Link to='/regis'>registation</Link></p>
                {/* <a href="#"><p className="small">Forgot your password?</p></a> */}
            </div>
        </div>
    )
}

export default Login