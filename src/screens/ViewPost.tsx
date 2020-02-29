import React from 'react';
import { Card, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import { gql } from 'apollo-boost';
// @ts-ignore
import * as HtmlToReact from 'html-to-react';
import { useQuery } from '@apollo/react-hooks';
import { Wrapper } from '../components/Wrapper';
import { useParams, Redirect } from 'react-router-dom';
import CommentsList from '../components/CommentList';
import Showdown from 'showdown';


const POST_QUERY = gql`query QUERY($id: ID!){
  post(id: $id){
    id
    title
    body
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

const CreatePost: React.FC = () => {
    const { id, commentId } = useParams();

    const { loading, error, data } = useQuery<{ post: any }>(POST_QUERY, { variables: { id: id || 0 } });

    if (!id) return <Redirect to="/feed" />

    if (error) {
        Toast.fail(error.toString(), 3)
        return <Redirect to="/feed" />
    }
    if (loading) return <p>Loading...!</p>

    const ListManager = () => {
        if (!commentId) {
            return <CommentsList comments={data?.post.comments} />
        }

        const rootComment = data?.post.comments.find((c: { id: string }) => c.id === commentId)

        return <CommentsList comments={data?.post.comments} rootComment={rootComment} />

    }

    return (
        <WingBlank size="md" style={{ overflowX: 'hidden' }}>
            <Card >
                <Card.Body style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                    <div>{parser.parse(converter.makeHtml(data?.post.body))}</div>
                </Card.Body>
            </Card>
            <WhiteSpace size='xl' />

            <ListManager />

        </WingBlank>
    );
}

export default Wrapper(CreatePost);