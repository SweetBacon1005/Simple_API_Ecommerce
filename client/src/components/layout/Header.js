import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
const listPages = ['trangchu','cuahang','gioithieu','lienhe']
const Header = () => {
    const [page, setPage] = useState('trangchu')
    useEffect(() => {
        const path = window.location.pathname
        const page = path.split('/')[1]
        if(listPages.includes(page)) {
            setPage(page)
        }

    }, [page])


    return (
        <div>
        <div className="offcanvas-menu-overlay"></div>
        <div className="offcanvas-menu-wrapper">
            <div className="offcanvas__option">
                <div className="offcanvas__links">
                    <a href='#' id="dangnhap2"></a><Link to="/login">Đăng ký</Link>
                </div>
                <div className="offcanvas__top__hover" >
                    <span id="username2"></span>
                    <i className="arrow_carrot-down"></i>
                    <ul id="danhmuc2">
                    </ul>
                </div>
                <div className="offcanvas__top__hover">
                    <span>VND</span>
                </div>
            </div>
            <div className="offcanvas__nav__option">
                <a href="#" className="search-switch"><img src="img/icon/search.png" alt="" /></a>
                <a href="./shopping-cart.html" onclick="kiemtra(event)"><img src="img/icon/cart.png" alt=""/> <span id="totalitem2"></span></a>
            </div>
            <div id="mobile-menu-wrap"></div>
            <div className="offcanvas__text">
                <p>Chìm đắm trong phong cách với LOMDOM </p>
            </div>
        </div>
        <header class="header">
        <div class="header__top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-7">
                        <div class="header__top__left">
                            <p>Chìm đắm trong phong cách với LOMDOM </p>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-5">
                        <div class="header__top__right">
                            <div class="header__top__links">
                                <a href="./signIn.html" id="dangnhap1">Đăng nhập</a>
                            </div>
                            <div class="header__top__hover" >
                                <span id="username1" style={{paddingRight: "15px",}}></span>
                                <ul id="danhmuc1" style={{backgroundColor: "black", color: "white"}}></ul>
                            </div>
                            <div class="header__top__hover">
                                <span>VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-3">
                    <div class="header__logo">
                        <a href="./index.html">
                            <h3>LOMDOM</h3>
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <nav class="header__menu mobile-menu">
                        <ul>
                            <li id="trangchu"><a href="./index.html">Trang chủ</a></li>
                            <li id="cuahang"><a href="./shop.html">Cửa hàng</a></li>
                            <li id="gioithieu"><a href="./about.html">Giới thiệu</a></li>
                            <li id="lienhe"><a href="./contact.html">Liên hệ</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-3 col-md-3">
                    <div class="header__nav__option">
                        <a href="#" class="search-switch"><img src="img/icon/search.png" alt=""/></a>
                        <a href="./shopping-cart.html" onclick="kiemtra(event)"><img src="img/icon/cart.png" alt=""/> <span id="totalitem1"></span></a>
                    </div>
                </div>
            </div>
            <div class="canvas__open"><i class="fa fa-bars"></i></div>
        </div>
    </header>
    <div class="search-model">
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div class="search-close-switch">+</div>
            <form class="search-model-form" onsubmit="search(event)">
                <input type="text" id="search-input" placeholder="Search here....."/>
            </form>
        </div>
    </div>
    </div>
    )
}

export default Header