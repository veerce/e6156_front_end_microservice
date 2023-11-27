import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from "./login";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "123597912667-ngn6o5ldqmkbhqji5k62v653ie4mg6kj.apps.googleusercontent.com";

function LoginScreen() {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };

        gapi.load('client:auth2', start);
    });

    //var accessToken = gapi.auth.getToken().access_token;

    return (
        <div className="LoginScreen">
            <LoginButton />
        </div>
    );
}

export default LoginScreen;