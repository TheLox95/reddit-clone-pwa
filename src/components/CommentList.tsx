import React, { useState, useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { Card, WhiteSpace, ListView, Icon } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const Comment: React.FC<{ isRoot?: true, comment: any, onCommentClick?: () => void }> = ({ isRoot, comment, onCommentClick }) => {
    const meta: { backgroundColor: string, layout: 'column' | 'row-reverse' } = {
        backgroundColor: '#f4f5f7',
        layout: 'column'
    }
    if (isRoot) {
        meta.backgroundColor = '#95bf74';
        meta.layout = 'row-reverse';
    }
    return (
        <>
            <Card onClick={onCommentClick} style={{ border: 'unset', backgroundColor: meta.backgroundColor }} >
                <WhiteSpace size="sm" />

                <Card.Body style={{ textAlign: 'left', alignItems: 'center', display: 'flex', flexDirection: meta.layout, padding: "0px 0.6rem 0px 0.6rem", overflow: 'hidden', border: 'unset' }}>
                    <div style={{ flex: 1, width: '100%' }}>

                        <div style={{ fontWeight: 'bold' }}>{comment.author.username}</div>
                        <div>{comment.body}</div>
                        {!isRoot && <div style={{ color: comment.comments.length > 0 ? '#95bf74' : 'grey', fontSize: '0.8rem', textAlign: 'right' }}>{comment.comments.length > 0 ? "See comments" : 'No comments'}</div>}
                    </div>
                    {isRoot && <p style={{ height: '100%', display: 'flex', alignItems: 'center' }}><Icon type="left" /></p>}
                </Card.Body>
            </Card>
            <WhiteSpace size='sm' />
        </>
    );
}

let source = new ListView.DataSource({
    rowHasChanged: (row1: { id: string }, row2: { id: string }) => row1.id !== row2.id,
});

const COMMENT_QUERY = gql`query QUERY($id: ID!){
    subComments(id: $id){
        id
        body
        rootPost
        author{
            username
        }
        comments{
            id
            comments{
                id
            }
        }
    }
  }`;

const CommentsList: React.FC<{ comments?: any[], rootComment?: any }> = ({ comments, rootComment }) => {
    const [dataSource, setDataSource] = useState(source.cloneWithRows(comments));
    const controls = useAnimation()
    const [done, setDone] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setDone(false)
    }, rootComment ? [rootComment.id] : []);

    const { data } = useQuery<{ subComments: any[] }>(COMMENT_QUERY, { variables: { id: rootComment ? rootComment.id : 0 }, skip: done });
    let header = {};

    if (rootComment) {
        header = {
            renderHeader: () => {
                return <Comment isRoot={true} comment={rootComment} onCommentClick={() => {
                    controls.start({
                        x: "100%",
                        transition: { duration: 1 },
                    })
                        .then(() => history.goBack())
                }} />
            }
        }
        if (done === false && data) {
            setDone(true)
            setDataSource(dataSource.cloneWithRows(data.subComments))
            return <h1>Loading</h1>
        }
    }

    controls.start({
        x: "0%",
        transition: { duration: 1 },
    })


    return (
        <motion.div style={{ x: rootComment ? '100%' : '-100%' }} animate={controls}>
            <ListView
                {...header}
                contentContainerStyle={{ position: 'unset' }}
                style={{ flex: 1 }}
                dataSource={dataSource}
                renderRow={(data: any, _, id) => {
                    const onCommentClick = () => {
                        if (data.comments && data.comments.length === 0) return console.log('no sub comments');
                        controls.start({
                            x: "-100%",
                            transition: { duration: 1 },
                        })
                            .then(() => history.push(`/post/${data.rootPost}/comment/${data.id}`))
                    }

                    return <Comment key={id} comment={data} onCommentClick={onCommentClick} />
                }}
                scrollRenderAheadDistance={500}
            />
        </motion.div>

    );
}

export default CommentsList;