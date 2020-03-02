import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Feed from './screens/Feed';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import CreatePost from './screens/CreatePost';
import Login from './screens/Login';
import Register from './screens/Register';
import ViewPost from './screens/ViewPost';
import Profile from './screens/Profile';
import Communities from './screens/Communities';

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
                  <Route path={`${path}/`} component={ViewPost} />
                  <Route path={`${path}/comment/:commentId`} component={ViewPost} />
                </>
              );
            }}
          />
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/communities" exact>
            <Communities />
          </Route>
          <Route path="/profile/:userId" exact>
            <Profile />
          </Route>
          <Route path="/createPost" exact>
            <CreatePost />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Redirect to="/feed" />
        </Switch>
    </Router>
  );
}

export default App;
