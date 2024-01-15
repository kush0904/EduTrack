import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './register.css';
export const Register =()=>{
    const navigate = useNavigate();
    const [user, setUser]=useState({
        name: "", email: "", phone: "", password: ""
    });

    let name, value;
    const handleInputs = (e) =>{
        name=e.target.name;
        value=e.target.value;

        setUser({...user, [name]:value});
    }

    const PostData = async (e)=>{
        e.preventDefault();

        const {name, email, phone, password } = user;

        const res =await fetch('http://localhost:5000/register', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, phone, password
            })
        });

        const data= await res.json();

        if(data.error || !data){
            window.alert("Inavlid Registration");
            console.log("Invalid Registration");
        }
        else{
            window.alert("Registration Successfull");
            console.log("Registration Successfull");

            navigate("/login");
        }
    }

    return(
        <>
        <section className="signup">
            <div className="container"><h2 className="title">Sign up</h2>
                <div className="signup-content">
                    <div className="signup-form">
                        
                        <form method='POST' className="regis-form" id="regis-form">

                            <div className="form-group">
                                <label htmlFor="name"></label>
                                <input type="text" name="name" id="name" placeholder='Your Name' 
                                value={user.name}
                                onChange={handleInputs}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email"></label>
                                <input type="email" name="email" id="email" placeholder='Your Email'
                                value={user.email}
                                onChange={handleInputs}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone"></label>
                                <input type="number" name="phone" id="phone" placeholder='Your Phone'
                                value={user.phone}
                                onChange={handleInputs}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password"></label>
                                <input type="password" name="password" id="password" placeholder='Your Password'
                                value={user.password}
                                onChange={handleInputs}/>
                            </div>

                            <div className="button">
                                <input type="submit" name="signup" id="signup" className='form-submit' 
                                value="register" onClick={PostData}/>
                            </div>
                        </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img src='./regis.jpg' alt="abc" />
                            </figure>
                        </div>
                    
                </div>
                
                <NavLink to="/login" className="login-link">I am already register</NavLink>
            </div>
        </section>
        </>
    )
}