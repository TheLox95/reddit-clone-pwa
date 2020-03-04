import React, { useEffect } from 'react';
import { Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { Wrapper } from '../components/Wrapper';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import PostCard from '../components/comments/PostCard';


const USER_QUERY = gql`query USER_QUERY($id: ID!){
  user(id: $id){
    username
    posts{
        id
        title
        body
        author{
            username
            id
        }
    }
  }
}`;

const ViewUser: React.FC = () => {
    const { userId } = useParams();
    const history = useHistory()

    const [fetchQueries, { loading, error, data }] = useLazyQuery<{ user: any }>(USER_QUERY, { variables: { id: userId || 0 } });

    useEffect(() => {
        fetchQueries();
    }, []);

    if (!userId) return <Redirect to="/feed" />

    if (error) {
        console.log(error)
        Toast.fail(error.toString(), 3)
        return <Redirect to="/feed" />
    }
    if (loading) return <p>Loading...!</p>

    return (
        <WingBlank size="md" style={{ overflowX: 'hidden' }}>
            <Card style={{ padding: '0.2rem', border: 'unset',background: "radial-gradient(circle at top left, rgba(149, 191, 116, 0.4) 43%, rgba(101,155,94,0.1) 100%)" }}>
                <Card.Body style={{ display: 'flex', flexDirection: 'column',borderTop: 'unset', alignItems: "start", padding: 0, overflow: 'hidden' }}>
                    <div style={{ color: 'white',fontSize: '1rem' }}>
                        {data && data.user.username}
                    </div>
                    <div style={{ color: 'white',fontSize: '1rem' }}>
                        {data && `So far ${data.user.posts.length} post`}
                    </div>
                </Card.Body>
            </Card>
            <WhiteSpace size='xl' />
            {data && data.user.posts.map((p: { id: string }) => {
                return PostCard(p, p.id, () => history.push(`/post/${p.id}`))
            })}

        </WingBlank>
    );
}

export default Wrapper(ViewUser);
