import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "react-mde/lib/styles/css/react-mde-all.css";
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    onError: (err) => {
        if (Array.isArray(err.graphQLErrors) && err.graphQLErrors[0].extensions.code === 'UNAUTHENTICATED') {
            localStorage.removeItem('reddit-clone-token');
            // eslint-disable-next-line no-restricted-globals
            location.reload()
        }
    },
    uri: 'http://localhost:6060/graphql',
    request: (operation) => {
        const token = localStorage.getItem('reddit-clone-token')
        const headers = token ? { authorization: `${token}` } : {}
        operation.setContext({ headers })
    }
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
