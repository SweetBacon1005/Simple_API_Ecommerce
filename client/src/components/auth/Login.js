import React from 'react'

const Login = () => {
  return (
    <div className='login'>
      <form>
        <h3>Login</h3>
        <div className='mb-2'>
          <label htmlFor='email' className='form-label'>Email address</label>
          <input type='email' className='form-control' id='email' />
        </div>
        <div className='mb-2'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input type='password' className='form-control' id='password' />
        </div>
        <div>
          <input type="checkbox" className='custom-control-input' id='customCheck1' />
          <label className='custom-control-label' htmlFor='customCheck1'>Remember me</label>
        </div>
      </form>
    </div>
  )
}

export default Login