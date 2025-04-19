import React from "react";
import Header from "./components/Header.js";
import SearchBar from "./components/SearchBar.js";
import HotelList from "./components/HotelList.js";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Payment from "./components/payment.js"
import KhuyenMai from "./components/khuyenmai.js"
import Review from "./components/review.js"
import HoTro from "./components/hotro.js"
import DangKi from "./components/dangki.js"
import Home from "./components/Home.js"
import KhachSan from "./components/khachsan.js"
import PhongDaDat from "./components/phongdadat.js"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<>
          <Home/>
        </>}></Route>
        <Route path="/khachsan" element = {<KhachSan/>}></Route>
        <Route path="/phong" element = {<HotelList/>}></Route>
        <Route path="/phongdadat" element = {<PhongDaDat/>}></Route>
        <Route path="/thanhtoan" element = {<Payment/>}></Route>
        <Route path="/khuyenmai" element = {<KhuyenMai/>}></Route>
        <Route path="/review" element = {<Review/>}></Route>
        <Route path="/hotro" element = {<HoTro/>}></Route>
        <Route path="/dangki" element = {<DangKi/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
