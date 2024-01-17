import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import './register.css';
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(
        {name: "", id: "", email: "", phone: "", password: ""}
    );

    let name,
        value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const {name, id, email, phone, password} = user;

        const res = await fetch('http://localhost:5000/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, id, email, phone, password})
        });

        const data = await res.json();

        if (data.error || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successful");
            console.log("Registration Successful");

            navigate("/Login");
        }
    }

    return (
        <div className='p-4 background-radial-gradient overflow-hidden h-100'>
            <div className='row'>
                <div
                    className='col-md-6 text-center text-md-start d-flex flex-column justify-content-center'>
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
                        <div className="signup-form  my-5 bg-glass p-5">

                            <form method='POST' className="regis-form" id="regis-form">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="bg-white"
                                        id="name"
                                        placeholder='Your Name'
                                        value={user.name}
                                        onChange={handleInputs}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="id">Student ID</label>
                                    <input
                                        type="number"
                                        name="id"
                                        className="bg-white"
                                        id="id"
                                        placeholder='Your Id'
                                        value={user.id}
                                        onChange={handleInputs}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email ID</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="bg-white"
                                        id="email"
                                        placeholder='Your Email'
                                        value={user.email}
                                        onChange={handleInputs}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Contact</label>
                                    <input
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        className="bg-white"
                                        placeholder='Your Phone'
                                        value={user.phone}
                                        onChange={handleInputs}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-white"
                                        placeholder='Your Password'
                                        value={user.password}
                                        onChange={handleInputs}/>
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="submit"
                                        name="signup"
                                        id="signup"
                                        className='form-submit w-100'
                                        value="Register"
                                        onClick={PostData}/>
                                </div>
                            </form>
                            <span className='login-link text-light fs-6 text-capitalize' style={{ marginRight: '20px' }}>
                                    Already own an account?
                            </span>
                            <NavLink to="/" className="login-link text-light fs-6 text-capitalize">Click here</NavLink>
                        </div>

                        
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Register;