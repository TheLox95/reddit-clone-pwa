import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Feed from './screens/Feed';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreatePost from './screens/CreatePost';
import Login from './screens/Login';
import Register from './screens/Register';
import ViewPost from './screens/ViewPost';

function App() {

  return (
    <Router>
        <Switch>
          <Route path="/" exact noTitle>
            <Login />
          </Route>
          <Route
            path="/post/:id"
            render={({ match: { path, params: { id } } }) => {
              return (
                <>
                  <Route path={`${path}/`} component={ViewPost} exact />
                  <Route path={`${path}/comment/:commentId`} component={ViewPost} />
                </>
              );
            }}
          />
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/createPost" exact>
            <CreatePost />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
