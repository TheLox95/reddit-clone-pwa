import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthRoute: React.FC = ({ children }) => {
    return (
        <>
        {localStorage.getItem('reddit-clone-token') ? children : <Redirect to="/" />}
        </>
    );

}

export default AuthRoute;