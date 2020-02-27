import React from 'react';
import Top from '../components/Drawer';

type Props = { background?: 'sm' | 'bg' };

export const Wrapper = (ToBeWrapped: React.FC, props?: Props): React.FC => {
    return () => {
        return (
            <Top background={props?.background ?? 'sm'}>
                <ToBeWrapped />
            </Top>
        )
    };
}