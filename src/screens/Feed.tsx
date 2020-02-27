import React, { useState, useEffect } from 'react';
import { Card, WhiteSpace, WingBlank, Flex, PullToRefresh } from 'antd-mobile';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const PostCard = (p: any, idx: number) => (
    <WingBlank key={idx} size="md">
        <Card style={{ padding: 0, height: '4rem' }}>
            <Card.Body style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                <img alt="" src="./notfound.png" style={{ height: 'auto',marginLeft: '-2.5rem', clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }} />
                <Flex direction="column" justify="between" style={{ width: '100%' }}>
                    <div>
                        <div>{p.title}</div>
                        <div>{p.body}</div>
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

const POST_QUERY = gql`{
    posts{
      title
      body
      author{
        username
        }
    }
  }`;

const Feed: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const { loading, error, data } = useQuery<{ posts: [] }>(POST_QUERY);

    useEffect(() => {
        setPosts(prev => {
            return data ? prev.concat(data.posts) : prev;
        });
    }, [loading]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <PullToRefresh
            getScrollContainer={() => null}
            distanceToRefresh={25}
            damping={60}
            style={{
                height: document.documentElement.clientHeight,
                overflow: 'auto',
            }}
            indicator={{ deactivate: null }}
            direction={'down'}
            refreshing={refreshing}
            onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                    setRefreshing(false);
                }, 1000);
            }}
        >
            {posts.map(PostCard)}
        </PullToRefresh>
    );
}

export default Feed;