import React, { useEffect } from 'react';
import { Card, WingBlank, WhiteSpace, Toast, Button } from 'antd-mobile';
import { gql } from 'apollo-boost';
// @ts-ignore
import * as HtmlToReact from 'html-to-react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Wrapper } from '../components/Wrapper';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import Showdown from 'showdown';
import ListManager from '../components/comments/CommentListManager';


const POST_QUERY = gql`query QUERY($id: ID!){
  post(id: $id){
    id
    title
    body
    author{
        id
        username
    }
    comments{
        id
        body
        rootPost
        author{
            username
        }
        comments{
            id
        }
    }
  }
}`;

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const parser = new HtmlToReact.Parser();

export type PartialComment = {
    id: string,
    body: string,
    rootPost: string,
    author: {
        username: string,
    }
    comments: [{
        id: string,
    }]
}

export type Post = {
    id: string,
    title: string,
    body: string,
    author:{
        id: string;
        username: string;
    }
    comments: PartialComment[]
}

const ViewPost: React.FC = () => {
    const { id } = useParams();
    const history = useHistory();

    const [fetchQueries, { loading, error, data, refetch }] = useLazyQuery<{ post: Post }>(POST_QUERY, { variables: { id: id || 0 } });

    useEffect(() => {
        fetchQueries();
    }, []);

    if (!id) return <Redirect to="/feed" />

    if (error) {
        Toast.fail(error.toString(), 3)
        return <Redirect to="/feed" />
    }
    if (loading) return <p>Loading...!</p>

    return (
        <WingBlank size="md" style={{ overflowX: 'hidden' }}>
            <Card >
                <Card.Body style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                    <div>
                        {data && parser.parse(converter.makeHtml(data.post.body))}
                        {data && <Button onClick={() => history.push(`/profile/${data.post.author.id}`)} size="small" style={{ backgroundColor: '#659b5e'}}>{data.post.author.username}</Button>}
                    </div>
                </Card.Body>
            </Card>
            <WhiteSpace size='xl' />

            {data && data.post && <ListManager comments={data.post.comments} rootPost={data.post} />}

        </WingBlank>
    );
}

export default Wrapper(ViewPost);