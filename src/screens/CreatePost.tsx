import React, { useState } from 'react';
import { Card, WingBlank, Flex, Tabs, Button, Toast } from 'antd-mobile';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { gql } from 'apollo-boost';
// @ts-ignore
import * as HtmlToReact from 'html-to-react';
import { useMutation } from '@apollo/react-hooks';


const CREATE_POST_QUERY = gql`mutation CREATE_POST_QUERY($title: String!, $body: String!, $communityId: ID!){
  postCreateOne(title: $title, body: $body, communityId: $communityId){
    id
  }
}`;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const CreatePost: React.FC = () => {

  const [preview, setPreview] = useState({ raw: '', parsed: '' });
  const [isPreviewDisabled, setIsPreviewDisabled] = useState(true);
  const [createPost, { loading }] = useMutation(CREATE_POST_QUERY);

  return (
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
              return <Flex.Item onClick={() => props.goToTab(idx)} style={{ ...disabledTab, ...activeStyleTab, marginLeft: 0, height: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
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

        <Button loading={loading} onClick={() => {
          createPost({ variables: { title: 'jjjj', body: preview.raw, communityId: 1 } })
            .then(r => console.log(r))
            .catch((err) => {
              Toast.fail(err.toString(), 1)
            })
        }} type="primary">Post</Button>
      </span>
    </Tabs>
  );
}

export default CreatePost;