import { NavLink } from 'react-router-dom';
import './register.css';

const Register =()=>{
    return(
        <>
        <section className="signup">
            <div className="container"><h2 className="title">Sign up</h2>
                <div className="signup-content">
                    <div className="signup-form">
                        
                        <form className="regis-form" id="regis-form">

                            <div className="form-group">
                                <label htmlFor="name"></label>
                                <input type="text" name="name" id="name" placeholder='Your Name'/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email"></label>
                                <input type="email" name="email" id="email" placeholder='Your Email'/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone"></label>
                                <input type="number" name="phone" id="phone" placeholder='Your Phone'/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password"></label>
                                <input type="password" name="password" id="password" placeholder='Your Password'/>
                            </div>

                            <div className="button">
                                <input type="submit" name="signup" id="signup" className='form-submit' value="register"  />
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

export default Register;