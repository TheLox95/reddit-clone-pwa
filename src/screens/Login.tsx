import React, { useState } from 'react';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, Tag } from 'antd-mobile';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import { Wrapper } from '../components/Wrapper';

const LOGIN_QUERY = gql`mutation($login: String!, $password: String!){
    signIn(login: $login, password: $password ){
      token
    }
  }`;

const Login = () => {
    const [logged, setLogged] = useState(false);
    const [goToRegister, setGoToRegister] = useState(false);
    const { handleSubmit, control, errors } = useForm();

    const [signIn, { loading }] = useMutation(LOGIN_QUERY);

    if (logged) return <Redirect to="/feed" />
    if (goToRegister) return <Redirect to="/register" />

    return (
        <>
            <WingBlank>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Reddit Clone</h1>
                <h3 style={{ textAlign: 'center' ,color: 'white', marginBottom: '1rem' }}>
                    Reddit clone by <a href="https://thelox95.github.io/">
                        <Tag>@TheLox95</Tag>
                    </a>
                </h3>
                
                <Controller as={
                    <InputItem
                    error={errors.username !== undefined}
                    name="username"
                    className="login-input"
                    placeholder="Username"
                    type="text"
                    clear
                />
                } name="username" rules={{ required: true }} control={control} />
                <WhiteSpace size="sm" />
                {errors.username !== undefined && (
                    <div style={{ textAlign: "left", padding: '0.2rem', color: '#fff', backgroundColor: '#f73135'}}>This field is require.</div>
                )}
                <WhiteSpace size="sm" />
                <Controller as={
                    <InputItem
                    error={errors.password !== undefined}
                    name="password"
                    placeholder="Password"
                    className="login-input"
                    type="password"
                    clear
                />
                } name="password" rules={{ required: true }} control={control} />
                <WhiteSpace size='sm' />
                {errors.password !== undefined && (
                    <div style={{ textAlign: "left", padding: '0.2rem', color: '#fff', backgroundColor: '#f73135'}}>This field is require.</div>
                )}
                <WhiteSpace size='xl' />
                <Button style={{ backgroundColor: '#95bf74', borderColor: "#95bf74" }} loading={loading} type="primary" onClick={handleSubmit((d) => {
                    signIn({ variables: { login: d.username, password: d.password } })
                        .then(({ data: { signIn } }) => {
                            localStorage.setItem('reddit-clone-token', signIn.token);
                            setLogged(true);
                        })
                        .catch((err) => {
                            Toast.fail(err.toString(), 4)
                        })
                })}>Login</Button>
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />
                <Button style={{ backgroundColor: '#659b5e', borderColor: "#659b5e" }} onClick={() => {
                    setGoToRegister(true);
                }} size="small" type="primary">Register</Button>
            </WingBlank>
        </>
    );

}

export default Wrapper(Login, { background: 'bg' });