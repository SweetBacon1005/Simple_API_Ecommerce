import React from 'react'

const Footer = () => {
  return (
    <div className='container'>
        <div className="col-lg-3 col-md-6 col-sm-6">
            <div className='footer__about'>
                <div className='footer__logo'>
                    <a href='/index.html'><h3 style={{color:'aliceblue'}}>LOMDOM</h3></a>
                </div>
                <p>Khách hàng là trung tâm của mô hình kinh doanh độc đáo của chúng tôi, bao gồm cả thiết kế.</p>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                <div className="footer__widget">
                    <h6>MUA SẮM</h6>
                    <ul>
                        <li><a href="">Áo</a></li>
                        <li><a href="#">Quần</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer__widget">
                    <h6>MUA SẮM</h6>
                    <ul>
                        <li><a href="./about.html">GIỚI THIỆU</a></li>
                        <li><a href="#">COD</a></li>
                        <li><a href="#">Delivary</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12 text-center">
                <div className="footer__copyright__text">
                    <p>Copyright ©
                        <script>
                            document.write(new Date().getFullYear());
                        </script>2023
                        Cảm ơn vì đã sử dụng sản phẩm  <i className="fa fa-heart-o"
                        aria-hidden="true"></i> của <a href="https://colorlib.com" target="_blank">LOMDOM</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Footer