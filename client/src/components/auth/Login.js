import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const Login = () => {
  return (
	<div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
		<div className='form-container p-5 rounded bg-white'>
			<form>
				<h3 className='text-center'>Login</h3>
				<div className='mb-2'>
					<label htmlFor='email' className='form-label'>Tên đăng nhập</label>
					<input type="email" placeholder='Nhập tên' className='form-control' />
				</div>
				<div className='mb-2'>
					<label htmlFor='password' className='form-label'>Password</label>
					<input type='password' placeholder='Nhập password' className='form-control' />
				</div>
				<div className='mb-2'>
					<input type='checkbox' className='custom-control custom-checkbox' id='check'/>
					<label htmlFor='check' className='custom-input label ms-2'>
						Nhớ tài khoản
					</label>
				</div>
				<div className='d-grid'>
					<button className='btn btn-primary'>Đăng nhập</button>
				</div>
				<p className='text-end mt-2'>
					Quên mật khẩu <a href='#'></a><Link to="/register" className='ms-2'>Đăng ký</Link>
				</p>
			</form>
		</div>
	</div>
  )
}

export default Login