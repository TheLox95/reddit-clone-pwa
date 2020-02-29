import React from 'react';
import Top from '../components/Drawer';

type Props = { background?: 'sm' | 'bg' };

export const Wrapper = <T extends {}>(ToBeWrapped: React.FC<T>, props?: Props): React.FC<T> => {
    return (p) => {
        return (
            <Top background={props?.background ?? 'sm'}>
                <ToBeWrapped {...p} />
            </Top>
        )
    };
}