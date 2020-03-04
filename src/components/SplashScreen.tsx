import React from 'react';
import { ActivityIndicator, Tag } from 'antd-mobile';

export const SplashScreen: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', width: '100vw', background: 'linear-gradient(135deg, rgba(14,59,67,1) 0%, rgba(88,119,125,1) 100%)' }}>
            <h1 style={{ textAlign: 'center', color: 'white' }}>Reddit Clone</h1>
            <h3 style={{ textAlign: 'center', color: 'white', marginBottom: '1rem' }}>
                Reddit clone by <a href="https://thelox95.github.io/">
                    <Tag>@TheLox95</Tag>
                </a>
            </h3>
            <ActivityIndicator size="large" className="splash-indicator" />
        </div>
    )
}