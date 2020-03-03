import React, { useState } from 'react';
import Top from '../components/Drawer';
import { Redirect, useLocation } from 'react-router-dom';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { IoIosAddCircle, IoMdText, IoIosPeople } from 'react-icons/io';

const FAB: React.FC = () => {
    const [redirect, setRedirect] = useState('');

    if (redirect !== '') {
        return <Redirect to={redirect} />
    }

    return (
        <Fab
            alwaysShowTitle={true}
            mainButtonStyles={{ backgroundColor: "#95bf74"}}
            icon={<IoIosAddCircle />}
            event='click'
        >
            <Action
                style={{ backgroundColor: "#95bf74"}}
                text="Create Post"
                onClick={() => setRedirect("/createPost")}
            >
                <IoMdText />
            </Action>
            <Action
                style={{ backgroundColor: "#95bf74"}}
                text="Crate Community"
                onClick={() => setRedirect("/createCommunity")}
            >
                <IoIosPeople />
            </Action>
        </Fab>
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