import React from 'react'
import { Link } from 'react-router-dom'
import './register.css'
const Register = () => {
  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
      <div className='form-container p-5 rounded bg-white'>
        <form>
          <h3 className='text-center'>Đăng ký</h3>
          <div className='mb-2'>
            <label htmlFor='email' className='form-label'>Tên đăng nhập</label>
            <input type="email" placeholder='Nhập tên' className='form-control' />
          </div>
          <div className='mb-2'>
            <label htmlFor='password' className='form-label'>Mật khẩu</label>
            <input type='password' placeholder='Nhập mật khẩu' className='form-control' />
          </div>
          <div className='mb-2'>
            <label htmlFor='password' className='form-label'>Nhập lại mật khẩu</label>
            <input type='password' placeholder='Nhập mật khẩu' className='form-control' />
          </div>
          <div className='mb-2'>
            <label htmlFor='email' className='form-label'>Email</label>
            <input type="email" placeholder='Nhập email' className='form-control' />
          </div>
          <div className='mb-2'>
            <input type='checkbox' className='custom-control custom-checkbox' id='check'/>
            <label htmlFor='check' className='custom-input label ms-2'>
              Tôi đồng ý với các điều khoản
            </label>
          </div>
          <div className='d-grid'>
            <button className='btn btn-primary'>Đăng ký</button>
          </div>
          <p className='text-end mt-2'>
            Đã có tài khoản?<a href='#'></a><Link to="/login" className='ms-2'>Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register