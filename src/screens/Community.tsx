import React, { useState, useEffect } from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import { gql } from 'apollo-boost';
import { Wrapper } from '../components/Wrapper';
import PostCard from '../components/comments/PostCard';

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
            id
        }
    }
  }`;

let source = new ListView.DataSource({
    rowHasChanged: (row1: { id: string }, row2: { id: string }) => row1.id !== row2.id,
});

const Feed: React.FC = () => {
    const history = useHistory()

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
            renderRow={(data: any, _, id) => PostCard(data, id, () => history.push(`/post/${data.id}`))}
            scrollRenderAheadDistance={500}
            onEndReached={() => setFetchIdx(prev => prev + 1)}
            onEndReachedThreshold={10}
        />
    );
}

export default Wrapper(Feed);