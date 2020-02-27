import React, { useState } from 'react';
import { InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LOGIN_QUERY = gql`mutation($login: String!, $password: String!){
    signIn(login: $login, password: $password ){
      token
    }
  }`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signIn, { loading }] = useMutation(LOGIN_QUERY);

    return (
        <>
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                zIndex: -1,
            }}>
                <WhiteSpace size='xl' style={{ backgroundColor: '#108ee9', height: '18rem' }} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#108ee9" fill-opacity="1" d="M0,192L30,197.3C60,203,120,213,180,229.3C240,245,300,267,360,245.3C420,224,480,160,540,154.7C600,149,660,203,720,192C780,181,840,107,900,96C960,85,1020,139,1080,149.3C1140,160,1200,128,1260,138.7C1320,149,1380,203,1410,229.3L1440,256L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
            </div>
            <WingBlank>
                <h1 style={{ textAlign: 'center' ,color: 'white' }}>Reddit Clone</h1>
                <h3 style={{ textAlign: 'center' ,color: 'white', marginBottom: '1rem' }}>Reddit clone by @TheLox95</h3>
                <InputItem
                    className="login-input"
                    placeholder="Username"
                    type="text"
                    clear
                    onChange={(v) => setUsername(v)}
                ></InputItem>
                <WhiteSpace />
                <InputItem
                    placeholder="Password"
                    className="login-input"
                    type="password"
                    clear
                    onChange={(v) => setPassword(v)}
                ></InputItem>
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />
                <Button style={{ backgroundColor: '#6157da' }} loading={loading} type="primary" onClick={() => {
                    signIn({ variables: { login: username, password: password } })
                        .then(({ data: { signIn } }) => {
                            localStorage.setItem('reddit-clone-token', signIn.token);
                        })
                        .catch((err) => {
                            Toast.fail(err.toString(), 4)
                        })
                }}>Login</Button>
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />
                <Button size="small" type="primary">Register</Button>
            </WingBlank>
        </>
    );

}

export default Login;