import React, { useState } from 'react';
import { Card, WingBlank, Flex, Tabs, Button, Toast, WhiteSpace } from 'antd-mobile';
import ReactMde from "react-mde";
import { gql } from 'apollo-boost';
// @ts-ignore
import * as HtmlToReact from 'html-to-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Wrapper } from '../components/Wrapper';
import { useParams, Redirect } from 'react-router-dom';


const POST_QUERY = gql`query QUERY($id: ID!){
  post(id: $id){
    id
    title
    body
    comments{
        body
        author{
            username
        }
        comments{
            id
        }
    }
  }
}`;

const CreatePost: React.FC = () => {
    const { id } = useParams();

    const { loading, error, data } = useQuery<{ post: any }>(POST_QUERY, { variables: { id: id || 0 } });

    if (!id) return <Redirect to="/feed" />

    if (loading) return <p>Loading...!</p>
    console.log(data?.post)

    return (
        <WingBlank size="md">
            <Card >
                <Card.Body style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                    <div>{data?.post.body}</div>
                </Card.Body>
            </Card>
            <WhiteSpace size='xl' />

            {data?.post.comments.map((c: any) => {
                return (
                    <>
                    <Card style={{ border: 'unset', backgroundColor: '#f4f5f7'}} >
                        <Card.Body style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', padding: "0px 0px 0px 0.6rem", overflow: 'hidden', border: 'unset' }}>
                            <WhiteSpace size="sm" />

                            <div style={{ fontWeight: 'bold'}}>{c.author.username}</div>
                            <div>{c.body}</div>
                            <span style={{ color: c.comments.length > 0 ? 'black' : 'grey' ,fontSize: '0.8rem', textAlign: 'left'}}>{c.comments.length > 0? "has comments": 'No comments'}</span>
                        </Card.Body>
                    </Card>
                    <WhiteSpace size='sm' />
                    </>
                );
            })}
        </WingBlank>
    );
}

export default Wrapper(CreatePost);