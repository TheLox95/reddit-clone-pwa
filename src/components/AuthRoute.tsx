import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const AuthRoute: React.FC<{component: React.ComponentType<any>} & RouteProps> = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('reddit-clone-token') ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
    )} />
 );

export default AuthRoute;