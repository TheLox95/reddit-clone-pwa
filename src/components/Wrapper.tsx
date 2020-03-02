import React, { useState } from 'react';
import Top from '../components/Drawer';
import { Button } from 'antd-mobile';
import { Redirect, useLocation } from 'react-router-dom';

const FAB: React.FC = () => {
    const [ redirect, setRedirect ] = useState(false);

    if (redirect) {
        return <Redirect to="/createPost" />
    }

    return (
        <Button 
            onClick={() => setRedirect(true)}
            style={{
                width: "4rem",
                height: "4rem",
                backgroundColor: "#95bf74",
                borderRadius: "50%",
            
                color: "white",
                textAlign: "center",
            
                position: "fixed",
                right: "5%",
                bottom: "5%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
        }}>+</Button>
    );
}

type Props = { background?: 'sm' | 'bg' };
export const Wrapper = <T extends {}>(ToBeWrapped: React.FC<T>, props?: Props): React.FC<T> => {
    return (p) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const location = useLocation()

        return (
            <Top background={props?.background ?? 'sm'}>
                <ToBeWrapped {...p} />
                {localStorage.getItem('reddit-clone-token') && location.pathname !== '/createPost' && <FAB />}
            </Top>
        )
    };
}