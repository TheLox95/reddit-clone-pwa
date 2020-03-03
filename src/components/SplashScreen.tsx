import React from 'react';
import { ActivityIndicator } from 'antd-mobile';

export const SplashScreen: React.FC = () => {
    return (
        <div style={{ height: '100vh', width: '100vw', background: 'linear-gradient(135deg, rgba(14,59,67,1) 0%, rgba(88,119,125,1) 100%)' }}>
            <ActivityIndicator size="large" className="splash-indicator" />
        </div>
    )
}