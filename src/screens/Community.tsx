import React, { useState, useEffect } from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
import { useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from "react-router-dom";
import { gql } from 'apollo-boost';
import { Wrapper } from '../components/Wrapper';
import PostCard from '../components/comments/PostCard';

const COMMUNITY_QUERY = gql`
    query getcommunity($id: ID!) {
    community(id: $id){
        title
        posts{
            id
            title
            body
            author{
                username
            }
        }
    }
  }`;

let source = new ListView.DataSource({
    rowHasChanged: (row1: { id: string }, row2: { id: string }) => row1.id !== row2.id,
});

const Feed: React.FC = () => {
    const { communityId } = useParams();

    const history = useHistory()

    const [fetchIdx, setFetchIdx] = useState(0);
    const [dataSource, setDataSource] = useState(source);
    const [, setPosts] = useState<any[]>([]);
    const { loading, error, data } = useQuery<{ community: any }>(COMMUNITY_QUERY, { variables: { id: communityId } });
    useEffect(() => {
        setPosts(prev => {
            if (!data) return prev;

            const newPost = data.community.posts.filter((p: {id:string}) => prev.find(f => f.id === p.id) === undefined)
            if (newPost.length === 0) return prev;

            setDataSource(dataSource.cloneWithRows(prev.concat(newPost)))
            return prev.concat(newPost);

        });
    }, [loading]);

    if (error) return <p>Error :(</p>;

        console.log(data)

    return (
        <ListView
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