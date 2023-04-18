
import { Link } from 'react-router-dom'
import './Regis.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../../axios'
function Regis() {

    let [userName, setUserName] = useState('')
    let [passWord, setPassWord] = useState('')
    let [confirm, setConfirm] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [sex, setSex] = useState(0)

    let checkConfirmPass = (pass, confirm) => {
        if (pass === confirm) {
            return true
        } else {
            return false
        }
    }
    let handleRegis = async (e) => {
        e.preventDefault();
        let data = {
            userName: userName,
            passWord: passWord,
            confirm: confirm,
            firstName: firstName,
            lastName: lastName,
            sex: sex
        }
        let check = checkConfirmPass(passWord, confirm)
        if (userName === '') {
            toast.warning("Username không được bỏ trống")
        } else if (passWord.length < 8) {
            toast.warning("Mật khẩu phải có ít nhất 8 kí tự")
        } else if (!check) {
            toast.warning("Mật khẩu xác nhận không chính xác")
        } else if (firstName === '') {
            toast.warning("First Name không được bỏ trống")
        } else if (lastName === '') {
            toast.warning("Last Name không được bỏ trống")
        } else {
            let rs = await axios.post('/regis', data)
            if (rs && rs.err === 0) {
                toast.success("Đăng kí tài khoản thành công")
            } else if (rs && rs.err === 2) {
                toast.error(rs.mes)
            } else {
                toast.error("Đăng kí tài khoản thât bại")
            }
        }
    }

    let handleRadio = (value) => {
        setSex(value)
    }
    return (
        <>
            <div className="form_wrapper">
                <div className="form_container">
                    <div className="title_container">
                        <Link to='/login'>Log in</Link>
                        <h2>Registration Form</h2>
                    </div>
                    <div className="row clearfix">
                        <div className="">
                            <form>
                                <div className="input_field">
                                    <span>
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <input type="text" name="username" placeholder="Username" required value={userName}
                                        onChange={(e) => { setUserName(e.target.value) }} />
                                </div>
                                <div className="input_field">
                                    <span>
                                        <i aria-hidden="true" className="fa fa-lock"></i>
                                    </span>
                                    <input type="password" name="password" placeholder="Password" required value={passWord}
                                        onChange={(e) => { setPassWord(e.target.value) }} />
                                </div>
                                <div className="input_field"> <span><i aria-hidden="true" className="fa fa-lock"></i></span>
                                    <input type="password" name="password" placeholder="Re-type Password" required value={confirm}
                                        onChange={(e) => { setConfirm(e.target.value) }} />
                                </div>
                                <div className="row clearfix">
                                    <div className="col_half">
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                            <input type="text" name="name" placeholder="First Name" value={firstName}
                                                onChange={(e) => { setFirstName(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="col_half">
                                        <div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
                                            <input type="text" name="name" placeholder="Last Name" required value={lastName}
                                                onChange={(e) => { setLastName(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="input_field radio_option">
                                    <input type="radio" name="radiogroup1" id="rd1" onChange={(e) => { handleRadio(1) }} />
                                    <label htmlFor="rd1">Male</label>
                                    <input type="radio" name="radiogroup1" id="rd2" onChange={(e) => { handleRadio(2) }} />
                                    <label htmlFor="rd2">Female</label>
                                </div>
                                <input className="button" type="submit" value="Register" onClick={(e) => { handleRegis(e) }} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <p className="credit">Developed by <a href="http://www.designtheway.com" target="_blank">Design the way</a></p> */}
        </>
    )
}
export default Regis