import React, { useState, useEffect } from 'react';
import { ListView, WingBlank, WhiteSpace, Card, Flex } from 'antd-mobile';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Wrapper } from '../components/Wrapper';
import { useHistory } from 'react-router-dom';

const POST_QUERY = gql`
    query getGreeting($idx: Int!) {
    communities(offset: $idx, limit: 10){
        id
        title
    }
  }`;

let source = new ListView.DataSource({
    rowHasChanged: (row1: { id: string }, row2: { id: string }) => row1.id !== row2.id,
});

const POSITION = ['left top', 'left center', 'left bottom', 'right top', 'right center', 'right bottom', 'center top', 'center center', 'center bottom']

const getCord = () => {
    const v = `${POSITION[Math.floor((Math.random()*POSITION.length))]}`
    return v
}


const Communities: React.FC = () => {
    const history = useHistory()
    const [fetchIdx, setFetchIdx] = useState(0);
    const [dataSource, setDataSource] = useState(source);
    const [, setPosts] = useState<any[]>([]);
    
    const { loading, error, data } = useQuery<{ communities: any[] }>(POST_QUERY, { variables: { idx: fetchIdx * 10 } });

    useEffect(() => {
        setPosts(prev => {
            if (!data) return prev;

            const newPost = data.communities.filter(p => prev.find(f => f.id === p.id) === undefined)
            if (newPost.length === 0) return prev;

            setDataSource(dataSource.cloneWithRows(prev.concat(newPost)))
            return prev.concat(newPost);
        });
    }, [loading]);

    if (error) return <p>Error :(</p>;

    return (
        <ListView
            contentContainerStyle={{ position: 'unset' }}
            style={{ flex: 1 }}
            dataSource={dataSource}
            renderRow={(data: any, _, id) => {
                return (
                    <WingBlank key={id} size="md">
                        <Card
                        onClick={() => history.push(`/community/${data.id}`)}
                        style={{
                            padding: 0,
                            height: '3rem',
                            border: 'unset',
                            background: `url('/circle.svg') ${getCord()}, url('/square.svg') ${getCord()}`,
                        }}>
                            <Card.Body style={{ borderTop: 'unset',display: 'flex', padding: 0, overflow: 'hidden' }}>
                                <Flex direction="column" justify="between" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ fontSize: '1.3rem',color: 'white', }}>{data.title}</div>
                                </Flex>
                            </Card.Body>
                        </Card>
                        <WhiteSpace size="lg" />
                    </WingBlank>
                );
            }}
            scrollRenderAheadDistance={500}
            onEndReached={() => setFetchIdx(prev => prev + 1)}
            onEndReachedThreshold={10}
        />
    );
}

export default Wrapper(Communities);