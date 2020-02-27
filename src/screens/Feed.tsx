import React, { useState, useEffect } from 'react';
import { Card, WhiteSpace, WingBlank, Flex, PullToRefresh, ListView } from 'antd-mobile';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Wrapper } from '../components/Wrapper';

const PostCard = (p: any, idx: React.ReactText) => (
    <WingBlank key={idx} size="md">
        {idx === '0' ? <WhiteSpace size="lg" style={{ minHeight: '1.5rem' }} /> : null}
        <Card style={{ padding: 0, height: '4rem' }}>
            <Card.Body style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                <img alt="" src="./notfound.png" style={{ height: 'auto', marginLeft: '-2.5rem', clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }} />
                <Flex direction="column" justify="between" style={{ width: '100%' }}>
                    <div>
                        <div>{p.title}</div>
                        <div style={{ fontSize: '0.6rem' }}>{p.body.slice(0, 40)}</div>
                    </div>
                    <Flex justify="between" style={{ width: '90%' }}>
                        <span style={{ color: 'grey', fontSize: '0.7rem' }}>{Date.now()}</span>
                        <span style={{ color: 'grey', fontSize: '0.7rem' }}>By {p.author.username}</span>
                    </Flex>
                </Flex>
            </Card.Body>
        </Card>
        <WhiteSpace size="lg" />
    </WingBlank>
)

const Pull: React.FC = ({ children }) => {
    const [refreshing, setRefreshing] = useState(false);

    return (
        <PullToRefresh
            getScrollContainer={() => null}
            distanceToRefresh={25}
            damping={60}
            indicator={{ deactivate: null }}
            direction={'down'}
            refreshing={refreshing}
            onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 1000);
            }}
        >{children}</PullToRefresh>
    );
}

const POST_QUERY = gql`
    query getGreeting($idx: Int!) {
    posts(offset: $idx, limit: 10){
        id
      title
      body
      author{
        username
        }
    }
  }`;

let source = new ListView.DataSource({
    rowHasChanged: (row1: { id: string }, row2: { id: string }) => row1.id !== row2.id,
});

const Feed: React.FC = () => {
    const [refreshing,] = useState(false);
    const [fetchIdx, setFetchIdx] = useState(0);
    const [dataSource, setDataSource] = useState(source);
    const [, setPosts] = useState<any[]>([]);
    const { loading, error, data } = useQuery<{ posts: any[] }>(POST_QUERY, { variables: { idx: fetchIdx * 10 } });

    useEffect(() => {
        setPosts(prev => {
            if (!data) return prev;

            const newPost = data.posts.filter(p => prev.find(f => f.id === p.id) === undefined)
            if (newPost.length === 0) return prev;

            setDataSource(dataSource.cloneWithRows(prev.concat(newPost)))
            return prev.concat(newPost);

        });
    }, [loading]);

    if (error) return <p>Error :(</p>;

    const por = !loading ? {} : {
        renderFooter: () => {
            return (
                <div style={{ padding: 30, textAlign: 'center' }}>
                    Loading...
                </div>
            );
        }
    }

    return (
        <ListView
            {...por}
            pullToRefresh={<Pull />}
            contentContainerStyle={{ position: 'unset' }}
            style={{ flex: 1 }}
            dataSource={dataSource}
            renderRow={(data: any, _, id) => PostCard(data, id)}
            scrollRenderAheadDistance={500}
            onEndReached={() => setFetchIdx(prev => prev + 1)}
            onEndReachedThreshold={10}
        />
    );
}

export default Wrapper(Feed);