import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Top from './components/Drawer';
import Feed from './screens/Feed';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreatePost from './screens/CreatePost';

function App() {

  return (
    <Router>
      <Top>
        <Switch>
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/createPost" exact>
            <CreatePost />
          </Route>
        </Switch>
      </Top>
    </Router>
  );
}

export default App;
