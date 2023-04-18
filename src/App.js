

// https://dribbble.com/shots/15376733-File-Manager-Dashboard-UI-Library-Page/attachments/7139521?mode=media

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayImage from "./page/admin/DisplayImage";
import DataMine from "./page/data_mining/DataMine";
import Login from "./page/login/Login"
import Regis from './page/registation/Regis'
import ListBook from './page/admin/ListBook'
import AddBook from './page/admin/AddBook'
import Home from './page/home/Home'
import DetailBook from "./page/home/DetailBook";
import ListBorrow from "./page/admin/ListBorrow";
import { ToastContainer } from 'react-toastify';
import './App.scss'
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail_book' element={<DetailBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regis" element={<Regis />} />
          <Route path="/admin/" >
            <Route path="image" element={<DisplayImage />} />
            <Route path="books" element={<ListBook />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="list_borrow" element={<ListBorrow />} />
          </Route>
          <Route path="/data-mining" element={<DataMine />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
