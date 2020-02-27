import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Top from './components/Drawer';
import Feed from './screens/Feed';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreatePost from './screens/CreatePost';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {

  return (
    <Router>
      <Top>
        <Switch>
          <Route path="/" exact noTitle>
            <Login />
          </Route>
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
      </Top>
    </Router>
  );
}

export default App;
