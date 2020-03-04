import React, { useState, useEffect } from 'react';
import { ListView } from 'antd-mobile';
import { useLazyQuery } from '@apollo/react-hooks';
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

    const [dataSource, setDataSource] = useState(source);
    const [, setPosts] = useState<any[]>([]);
    const [fetchCommnity ,{error, data, called, refetch}] = useLazyQuery<{ community: any }>(COMMUNITY_QUERY, {
        fetchPolicy: 'no-cache',
        onCompleted: (result) => {
            setPosts(prev => {
                const newPost = result.community.posts
                .filter((p: {id:string}) => prev.find(f => f.id === p.id) === undefined)
                if (newPost.length === 0) return prev;
    
                setDataSource(dataSource.cloneWithRows(prev.concat(newPost).reverse()))
                return prev.concat(newPost);
    
            });
        }
    });

    useEffect(() => {
        if (!communityId) return
        if (called){
            refetch({ variables: { id: communityId } })
        } else {
            fetchCommnity({ variables: { id: communityId } });
        }
    }, []);

    if (error) {
        console.log(error)
        return <p>Error :(</p>;
    }

    return (
        <ListView
            renderHeader={() => {
                return (
                    <>
                    <h1 style={{ color: 'white'}}>{data?.community.title}</h1>
                    {data && data.community.posts.length === 0 && <h3 style={{ color: 'black'}}>No post so far</h3>}
                    </>
                );
            }}
            contentContainerStyle={{ position: 'unset' }}
            style={{ flex: 1 }}
            dataSource={dataSource}
            renderRow={(data: any, _, id) => PostCard(data, id, () => history.push(`/post/${data.id}`))}
            scrollRenderAheadDistance={500}
            onEndReachedThreshold={10}
        />
    );
}

export default Wrapper(Feed);