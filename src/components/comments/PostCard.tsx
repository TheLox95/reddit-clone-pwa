import React from 'react';

import { Card, WhiteSpace, WingBlank, Flex } from 'antd-mobile';

const PostCard = (p: any, idx: React.ReactText, fn: () => void) => {
    return (
        <WingBlank key={idx} size="md">
            {idx === '0' ? <WhiteSpace size="lg" style={{ minHeight: '1.5rem' }} /> : null}
            <Card onClick={() => fn() } style={{ padding: 0, height: '4rem' }}>
                <Card.Body style={{ display: 'flex', padding: 0, overflow: 'hidden' }}>
                    <img alt="" src="/notfound.png" style={{ height: 'auto', marginLeft: '-2.5rem', clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }} />
                    <Flex direction="column" justify="between" style={{ width: '100%' }}>
                        <div>
                            <div>{p.title}</div>
                            <div style={{ fontSize: '0.6rem', wordBreak: 'break-word' }}>{p.body.slice(0, 40)}</div>
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
}

export default PostCard;