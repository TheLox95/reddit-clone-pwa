import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from './CommentList';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PartialComment } from '../../screens/ViewPost';
import CreateComment from './CreateComment';
import { WhiteSpace } from 'antd-mobile';

export type CommentQuery = {
    id: string
    body: string
    rootPost: string
    author: {
        username: string
    }
    comments: [{
        id: string
        body: string
        rootPost: string
        author: {
            username: string
        }
        comments: {
            id: string
        }
    }]
}

const COMMENT_QUERY = gql`query QUERY($id: ID!){
    comment(id: $id){
        id
        body
        rootPost
        author{
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


const ListManager: React.FC<{ comments: CommentQuery[] | PartialComment[], rootPost: { id: string } }> = ({ comments, rootPost }) => {
    const { commentId } = useParams();

    const [commentToLook, setCommentToLook] = useState(null);
    const [loadQueries, { data: commentData, called, refetch }] = useLazyQuery<{ comment: CommentQuery }>(COMMENT_QUERY);

    useEffect(() => {
        if (!commentId) return;
        if (!called) {
            loadQueries( { variables: { id: commentId } });
        } else {
            refetch({ variables: { id: commentId } })
        }
    }, [commentToLook]);

    if (!commentId) {
        return (
            <CommentsList comments={comments} rootPost={rootPost.id} >
                {localStorage.getItem('reddit-clone-token') && rootPost && !commentId && <CreateComment onCreate={() => refetch()} rootPost={rootPost.id} postId={rootPost.id} />}
                <WhiteSpace />
            </CommentsList>
        );
    } else {
        if (commentData) {
            return <CommentsList onClick={(c) => setCommentToLook(c)} rootComment={commentData.comment} comments={commentData?.comment.comments} rootPost={rootPost.id} />
        }
    }

    return null;
}

export default ListManager;