import React, {useState} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import './login.css';
const  Login =()=>{

    const navigate=useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const loginUser = async(e)=>{
        e.preventDefault();

        const res = await fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data=res.json();

        if(res.status ===400 || !data){
            window.alert("Invalid Credentials");
        }else{
            window.alert("Login Successfull");
            navigate("/")
        }
    }

    return(
        <>
        <section className="signup">
            <div className="container"><h2 className="title">
                            login
                        </h2>
                <div className="signup-content">
                    <div className="signup-image">
                            <figure>
                                <img src='./login.jpg' alt="abc" />
                            </figure>
                        </div>
                    <div className="signup-form">
                        
                        <form method="POST" className="regis-form" id="regis-form">

                            <div className="form-group">
                                <label htmlFor="email"></label>
                                <input type="email" name="email" id="email" 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Your Email'/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="password"></label>
                                <input type="password" name="password" id="password" 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder='Your Password'/>
                            </div>

                            <div className="button">
                                <input type="submit" name="signin" id="signup" className='form-submit' 
                                onClick={loginUser}
                                value="login"  />
                            </div>
                        </form>
                        </div>
                        
                    
                </div>
                <h4>Create an account!
                <NavLink to="/Register" className="login-link"> Sign-Up</NavLink></h4>
            </div>
        </section>
        </>
    )
}

export default Login;