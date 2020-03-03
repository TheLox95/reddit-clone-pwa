import React from 'react';
import { InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'
import { Wrapper } from '../components/Wrapper';

const CREATE_COMMUNTY_MUTATION = gql`mutation ($title: String!){
    communityCreateOne(title: $title){
      id
    }
  }`;

const CreateCommunity = () => {
    const { handleSubmit, control, errors } = useForm();
    const history = useHistory();

    const [createCommunity, { loading }] = useMutation(CREATE_COMMUNTY_MUTATION);

    return (
        <>
            <WingBlank>
                <h3 style={{ textAlign: 'center', color: 'white' }}>Create Community</h3>
                
                <Controller as={
                    <InputItem
                    error={errors.title !== undefined}
                    name="title"
                    className="login-input"
                    placeholder="Title"
                    type="text"
                    clear
                />
                } name="title" rules={{ required: true }} control={control} />
                <WhiteSpace size="sm" />
                {errors.title !== undefined && (
                    <div style={{ textAlign: "left", padding: '0.2rem', color: '#fff', backgroundColor: '#f73135'}}>This field is require.</div>
                )}
                <WhiteSpace size='xl' />
                <Button style={{ backgroundColor: '#95bf74', borderColor: "#95bf74" }} loading={loading} type="primary" onClick={handleSubmit((d) => {
                    createCommunity({ variables: { title: d.title } })
                        .then(({ data: { communityCreateOne } }) => {
                            console.log(communityCreateOne)
                            history.push(`/community/${communityCreateOne.id}`)
                        })
                        .catch((err) => {
                            Toast.fail(err.toString(), 4)
                        })
                })}>Login</Button>
                <WhiteSpace size='xl' />
            </WingBlank>
        </>
    );

}

export default Wrapper(CreateCommunity);