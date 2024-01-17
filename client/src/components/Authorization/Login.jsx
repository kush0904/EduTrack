import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ setLoggedIn, setUserName,setUserId }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert('Invalid Credentials');
    } else {
      window.alert('Login Successful');
      setLoggedIn(true);

      const { nm: name, userId } = data;

      setUserName(name);
        setUserId(userId);
      navigate('/DashBoard');
    }
  };

    return (
        <div className='p-4 background-radial-gradient overflow-hidden' style={{ marginTop:"20vh"}}>
            <div className='row'>
                <div
                    className='col-md-6 text-center text-md-start d-flex flex-column justify-content-center p-6'>
                    <h1
                        className="my-5 display-3 fw-bold ls-tight px-3"
                        style={{
                            color: 'hsl(218, 81%, 95%)'
                        }}>
                        
                        EDUTRACK+
                        <br />

                        tracking academic success
                        <br/>
                        <span
                            style={{
                                color: 'hsl(218, 81%, 75%)'
                            }}>efficiently</span>
                    </h1>
                    <p
                        className='px-3'
                        style={{
                            color: 'hsl(218, 81%, 85%)'
                        }}>
                        Precision for Progress, Insight for Impact. Track your academic journey with efficiency, unlock potential, and inspire a future of achievements
                    </p>
                </div>
                <div className='col-md-6 position-relative'>
                    <div
                        id="radius-shape-1"
                        className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                    <section className="signup">
                        <div className="signup-form my-5 bg-glass p-5">
                            <form method="POST" className="regis-form" id="regis-form">
                                <div className="form-group">
                                    <label htmlFor="email">Email ID</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-white"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Your Email'/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Your Password'/>
                                </div>

                                <input
                                    type="submit"
                                    name="signin"
                                    id="signup"
                                    className='form-submit btn-primary w-100 mb-4'
                                    onClick={loginUser}
                                    value="Log In"/>
                            </form>

                            <span className='login-link text-light fs-6 text-capitalize' style={{ marginRight: '20px' }}>
                                    Do not have an account?
                            </span>
                            <NavLink to="/Register" className="login-link text-light fs-6 text-capitalize">
                                {' '}
                                Sign Up
                            </NavLink>
                        </div>
                    </section>
                </div>
                
            </div>
            
        </div>

    );

}
export default Login;
