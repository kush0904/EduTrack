import { NavLink } from 'react-router-dom';
import './login.css';
const  Login =()=>{

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
                        
                        <form className="regis-form" id="regis-form">

                            <div className="form-group">
                                <label htmlFor="email"></label>
                                <input type="email" name="email" id="email" placeholder='Your Email'/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="password"></label>
                                <input type="password" name="password" id="password" placeholder='Your Password'/>
                            </div>

                            <div className="button">
                                <input type="submit" name="signup" id="signup" className='form-submit' value="login"  />
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