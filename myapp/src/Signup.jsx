import { useState } from "react";
import "./login_signup.css"

function SignUp(){

    let [signupData,setSignupData] = useState({
        username:"",
        email:"",
        password:"",
        confirm_password:""
    })

    function handleChange(e){
        const name = e.target.name;
        const value=e.target.value;
        setSignupData({...signupData,[name]:value});
    }
    

    function handleSubmit(e){
        e.preventDefault()
        try{
            
        }
        catch(err){

        }
    }

    return(
        <>
            <div className='login-signup-div'>
                <div className='login-signup'>
                    <form className='form' action="" method="post" onSubmit={handleSubmit}>
                        <div className='form-header'>
                            Sign Up
                        </div>
                        <div className='form-element'>
                            <div className='element-header'>
                                Name
                            </div>
                            <div className='element-input-div'>
                                <input className='element-input' name='user_first_name' id="user_first_name" type="text"  onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='form-element'>
                            <div className='element-header'>
                                Email
                            </div>
                            <div className='element-input-div'>
                                <input className='element-input' name='email' id="email" type="email"   onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='form-element'>
                            <div className='element-header'>
                                Password
                            </div>
                            <div className='element-input-div'>
                                <input className='element-input' name='password' id="password" type="password"  onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='form-element'>
                            <div className='element-header'>
                                Confirm Password
                            </div>
                            <div className='element-input-div'>
                                <input className='element-input' name='confirm_password' id="confirm_password" type="password"  onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='form-submit'>
                            <div className='element-submit-div'>
                                <input className='submit-button' type="submit" value={"Sign Up"}/>
                            </div>
                        </div>
                    </form>
                    <div className='login-signup-redirect'>
                        {/* I have an Account. <Link to="/log-in">Log In</Link> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp