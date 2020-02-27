import React, { useState } from 'react';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, Tag } from 'antd-mobile';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { Wrapper } from '../components/Wrapper';

const REGISTER_QUERY = gql`mutation($username: String!, $password: String!, $email: String!){
    userCreateOne(username: $username, password: $password, email: $email){
      token
    }
  }`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [registered, setRegistered] = useState(false);
    const [userCreateOne, { loading }] = useMutation(REGISTER_QUERY);

    if (registered) {
        return <Redirect to="/feed" />
    }

    return (
        <>
            <WingBlank>
                <h1 style={{ textAlign: 'center' ,color: 'white' }}>Reddit Clone</h1>
                <h3 style={{ textAlign: 'center' ,color: 'white', marginBottom: '1rem' }}>
                    Reddit clone by <a href="https://thelox95.github.io/">
                        <Tag>@TheLox95</Tag>
                    </a>
                </h3>
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
                <WhiteSpace />
                <InputItem
                    placeholder="Email"
                    className="login-input"
                    type="text"
                    clear
                    onChange={(v) => setEmail(v)}
                ></InputItem>
                <WhiteSpace size='xl' />
                <Button style={{ backgroundColor: '#95bf74' }} loading={loading} type="primary" onClick={() => {
                    userCreateOne({ variables: { username: username, password: password, email: email } })
                        .then(({ data: { userCreateOne } }) => {
                            localStorage.setItem('reddit-clone-token', userCreateOne.token);
                            setRegistered(true);
                        })
                        .catch((err) => {
                            Toast.fail(err.toString(), 4)
                        })
                }}>Register</Button>
            </WingBlank>
        </>
    );

}

export default Wrapper(Register, { background: 'bg' });