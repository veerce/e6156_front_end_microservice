import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientId = "123597912667-ngn6o5ldqmkbhqji5k62v653ie4mg6kj.apps.googleusercontent.com"

function Logout()
{
    const navigate = useNavigate();

    const onSuccess = () => {
        console.log("LOGOUT SUCCESS!");
        navigate('/');
    }

    return(
        <div id="signOutButton">
            <GoogleLogout
                clientId = {clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;