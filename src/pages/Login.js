import React from 'react'

function Login() {
  return (
    <div className='login'>
    <div className='login-container'>
        <div className='login-form'>
            <div className='login-head'>
                <h2>Login</h2>
                <h5>welcome</h5>
            </div>
            <div className='login-body'>
                <form>
                    
                        <label>username 
                        <input type='text' name='name' required />
                        </label>

                        <label>password 
                        <input type='password' name='pass' required />
                        </label>

                    <input type="submit" />
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login