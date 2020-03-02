import React, { useState } from 'react';
import { Card, WingBlank, Flex, Tabs, Button, Toast, Modal } from 'antd-mobile';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { gql } from 'apollo-boost';
// @ts-ignore
import * as HtmlToReact from 'html-to-react';
import { useMutation } from '@apollo/react-hooks';


const CREATE_COMMENT_FOR_POST = gql`mutation CREATE_COMMENT_FOR_POST($postId: String!, $body: String!, $rootPostId: String!){
  commentCreateOne(body: $body, postId: $postId, rootPostId: $rootPostId){
    id
  }
}`;

const CREATE_COMMENT_FOR_COMMENT = gql`mutation CREATE_COMMENT_FOR_POST($commentId: String!, $body: String!, $rootPostId: String!){
    commentCreateOne(body: $body, commentId: $commentId, rootPostId: $rootPostId){
      id
    }
  }`;

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

const CreateComment: React.FC<{ onCreate: (r: any) => void, rootPost: string, commentId?: string, postId?: string }> = ({ onCreate, rootPost, commentId, postId }) => {

    const [preview, setPreview] = useState({ raw: '', parsed: '' });
    const [wantToCreate, setWantToCreate] = useState(false);
    const [isPreviewDisabled, setIsPreviewDisabled] = useState(true);
    const [commentPost, { loading: loadingCommentPost }] = useMutation(CREATE_COMMENT_FOR_POST);
    const [commentAnotherComment, { loading: loadingAnotherComment }] = useMutation(CREATE_COMMENT_FOR_COMMENT);

    const loading = loadingCommentPost || loadingAnotherComment;

    return (
        <>
            <Button loading={loading} onClick={() => setWantToCreate(true)} type="primary">Comment</Button>
            <Modal
                bodyStyle={{ display: 'flex', flexDirection: 'column' }}
                popup
                visible={wantToCreate}
                style={{ height: '80%' }}
                animationType="slide-up"
            >
                <Tabs tabs={[
                    { title: 'Editor', sub: '1' },
                    { title: 'Preview', sub: '2', isPreviewDisabled },
                ]}
                    initialPage={0}
                    tabBarPosition="bottom"
                    renderTabBar={props => {
                        return (
                            <Flex>
                                {props.tabs.map((t, idx) => {
                                    const activeStyleTab = idx === props.activeTab ? { borderBottom: '1px solid #108ee9' } : {}
                                    const disabledTab = t.isPreviewDisabled ? { color: 'grey', pointerEvents: 'none' } : {}
                                    return <Flex.Item key={idx} onClick={() => props.goToTab(idx)} style={{ ...disabledTab, ...activeStyleTab, marginLeft: 0, height: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                                        <span>{t.title}</span>
                                    </Flex.Item>
                                })}
                            </Flex>
                        );
                    }}
                >
                    <ReactMde
                        classes={{
                            reactMde: "reactMde",
                            textArea: "textArea",
                        }}
                        onChange={(t) => {
                            if (t.length > 20) {
                                setIsPreviewDisabled(false);
                            }
                            if (t === "") {
                                setIsPreviewDisabled(true);
                            }
                            const parser = new HtmlToReact.Parser();
                            const p = parser.parse(converter.makeHtml(t))
                            setPreview({ parsed: p, raw: t })
                        }}
                        disablePreview={true}
                        selectedTab={undefined}
                    />
                    <span style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                    }}>

                        <Card full style={{ padding: 0, flex: 1 }}>
                            <WingBlank size="md">
                                <Card.Body style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                                    <div>{preview.parsed}</div>
                                </Card.Body>
                            </WingBlank>
                        </Card>
                    </span>
                </Tabs>
                <Flex>
                    <Flex.Item>
                        <Button style={{ backgroundColor: '#95bf74', borderColor: "#95bf74" }} onClick={() => setWantToCreate(false)} type="primary">Cancel</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button style={{ backgroundColor: preview.parsed.length < 20 ? '#95bf74' : '#659b5e', borderColor: preview.parsed.length < 20 ? '#95bf74' : '#659b5e' }} loading={loading} onClick={() => {
                            if (postId) {
                                commentPost({ variables: { postId, body: preview.raw, rootPostId: rootPost } })
                                    .then(r => {
                                        onCreate(r.data)
                                        setWantToCreate(false)
                                    })
                                    .catch((err) => {
                                        Toast.fail(err.toString(), 3)
                                    })
                            }

                            if (commentId) {
                                commentAnotherComment({ variables: { commentId, body: preview.raw, rootPostId: rootPost } })
                                    .then(r => {
                                        onCreate(r.data)
                                        setWantToCreate(false)
                                    })
                                    .catch((err) => {
                                        Toast.fail(err.toString(), 3)
                                    })
                            }
                        }} type="primary">Post</Button>
                    </Flex.Item>
                </Flex>
            </Modal>
        </>
    );
}

export default CreateComment;