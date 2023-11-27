import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

const clientId = "123597912667-ngn6o5ldqmkbhqji5k62v653ie4mg6kj.apps.googleusercontent.com"

function Login()
{
    const navigate = useNavigate();

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user is: ", res.profileObj);
        navigate('/home');
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId = {clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login;
