import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentsList from './CommentList';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PartialComment } from '../../screens/ViewPost';

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
    const [loadQueries, { data: commentData, called, refetch }] = useLazyQuery<{ comment: CommentQuery }>(COMMENT_QUERY, { variables: { id: commentId ? commentId : 0 } });

    useEffect(() => {
        if (!called) {
            loadQueries();
        } else {
            refetch()
        }
    }, [commentToLook]);

    if (!commentId) {
        return <CommentsList comments={comments} rootPost={rootPost.id} />
    } else {
        if (commentData) {
            return <CommentsList onClick={(c) => setCommentToLook(c)} rootComment={commentData.comment} comments={commentData?.comment.comments} rootPost={rootPost.id} />
        }
    }

    return null;
}

export default ListManager;