import React, { useState } from 'react';
import { Card, WingBlank, Flex, Tabs, Button, Toast, Picker, InputItem } from 'antd-mobile';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { gql } from 'apollo-boost';
// @ts-ignore
import * as HtmlToReact from 'html-to-react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Wrapper } from '../components/Wrapper';
import { Redirect } from 'react-router-dom';

const CREATE_POST_QUERY = gql`mutation CREATE_POST_QUERY($title: String!, $body: String!, $communityId: ID!){
  postCreateOne(title: $title, body: $body, communityId: $communityId){
    id
  }
}`;

const QUERY_COMMUNITIES = gql`{
    communities(limit: 500){
        id
        title
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
  const [created, setCreated] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<{ id: string, title: string } | null>(null);
  const [createPost, { loading }] = useMutation(CREATE_POST_QUERY);
  const { data, loading: loadingCommunities } = useQuery<{ communities: any[] }>(QUERY_COMMUNITIES, {
    onCompleted: (data) => {
      setSelectedCommunity(data.communities[0])
    }
  });

  if (created) return <Redirect to={`/post/${created}`} />

  return (
    <Tabs tabs={[
      { title: 'Editor', sub: '1' },
      { title: 'Preview', sub: '2', isPreviewDisabled },
    ]}
      initialPage={0}
      tabBarPosition="bottom"
      renderTabBar={props => {
        return (
          <>
            <Flex>
              {props.tabs.map((t, idx) => {
                const activeStyleTab = idx === props.activeTab ? { borderBottom: '1px solid #108ee9' } : {}
                const disabledTab = t.isPreviewDisabled ? { color: 'grey', pointerEvents: 'none' } : {}
                return <Flex.Item key={idx} onClick={() => props.goToTab(idx)} style={{ ...disabledTab, ...activeStyleTab, marginLeft: 0, height: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                  <span>{t.title}</span>
                </Flex.Item>
              })}
            </Flex>
            {loadingCommunities && !selectedCommunity ? (<h2>Loading...</h2>) : (data && selectedCommunity &&
              <Picker
                cols={1}
                data={data.communities.map(c => ({ value: c.id, label: c.title }))}
                value={[selectedCommunity.id]}
                onOk={v => {
                  const a = data.communities.find(c => v.includes(c.id))
                  setSelectedCommunity(a);
                }}
                okText={'Select'}
                dismissText={'Close'}
              >
                <h4>Post on {selectedCommunity.title.toUpperCase()}</h4>
              </Picker>
            )}
          </>
        );
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
        <InputItem placeholder="Title" onChange={(c) => setTitle(c)} />
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
      </div>
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
          if (title === '') return Toast.fail('Write a title', 1)
          selectedCommunity && createPost({ variables: { title: title, body: preview.raw, communityId: selectedCommunity.id } })
            .then(r => setCreated(r.data.postCreateOne.id))
            .catch((err) => {
              Toast.fail(err.toString(), 1)
            })
        }} type="primary">Post</Button>
      </span>
    </Tabs>
  );
}

export default Wrapper(CreatePost);