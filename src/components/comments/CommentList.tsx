import React, {  } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { Card, WhiteSpace, Icon } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import CreateComment from './CreateComment';
import { CommentQuery } from './CommentListManager';

const Comment: React.FC<{ isRoot?: true, comment: CommentQuery, onCommentClick?: (c: any) => void }> = ({ isRoot, comment, onCommentClick }) => {
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
            <Card onClick={() => { onCommentClick && onCommentClick(comment)}} style={{ border: 'unset', backgroundColor: meta.backgroundColor }} >
                <WhiteSpace size="sm" />

                <Card.Body style={{ textAlign: 'left', alignItems: 'center', display: 'flex', flexDirection: meta.layout, padding: "0px 0.6rem 0px 0.6rem", overflow: 'hidden', border: 'unset' }}>
                    <div style={{ flex: 1, width: '100%' }}>

                        <div style={{ fontWeight: 'bold' }}>{comment.author.username}</div>
                        <div style={{ wordBreak: 'break-all'}}>{comment.body}</div>
                        {!isRoot && <div style={{ color: comment.comments.length > 0 ? '#95bf74' : 'grey', fontSize: '0.8rem', textAlign: 'right' }}>{comment.comments.length > 0 ? "See comments" : 'No comments'}</div>}
                    </div>
                    {isRoot && <p style={{ height: '100%', display: 'flex', alignItems: 'center' }}><Icon type="left" /></p>}
                </Card.Body>
            </Card>
            <WhiteSpace size='sm' />
        </>
    );
}


const CommentsList: React.FC<{ comments?: any[], rootComment?: CommentQuery, rootPost: string, onClick?: (c: any) => void }> = ({ onClick, comments, rootComment, rootPost, children }) => {
    const controls = useAnimation()
    const history = useHistory();

    controls.start({
        x: "0%",
        transition: { duration: 1 },
    })

    return (
        <motion.div style={{ x: rootComment ? '100%' : '-100%' }} animate={controls}>
            {children}
            {rootComment && (
                <>
                <Comment isRoot={true} comment={rootComment} onCommentClick={() => {
                    controls.start({
                        x: "-100%",
                        transition: { duration: 1 },
                    })
                        .then(() => history.goBack())
                }} />
                {localStorage.getItem('reddit-clone-token') && <CreateComment onCreate={(r) => onClick && onClick(r)} rootPost={rootPost} commentId={rootComment.id} />}
                </>
            )}
            {comments?.map((data: any) => {
                return (
                    <Comment key={data.id} comment={data} onCommentClick={() => {
                        controls.start({
                            x: "-100%",
                            transition: { duration: 1 },
                        })
                        .then(() => {
                            history.push(`/post/${data.rootPost}/comment/${data.id}`)
                            onClick && onClick(data)
                        })
                    }} />
                );
            })}
        </motion.div>

    );
}

export default CommentsList;