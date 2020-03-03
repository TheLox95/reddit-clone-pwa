import React, { lazy, Suspense } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { SplashScreen } from './components/SplashScreen';

const Feed = lazy(() => import('./screens/Feed'));
const CreateCommunity = lazy(() => import('./screens/CreateCommunity'));
const CreatePost = lazy(() => import('./screens/CreatePost'));
const Login = lazy(() => import('./screens/Login'));
const Register = lazy(() => import('./screens/Register'));
const ViewPost = lazy(() => import('./screens/ViewPost'));
const Profile = lazy(() => import('./screens/Profile'));
const Community = lazy(() => import('./screens/Community'));
const Communities = lazy(() => import('./screens/Communities'));


function App() {

  return (
    <Router>
      <Suspense fallback={<SplashScreen></SplashScreen>}>
        <Switch>
          <Route path="/" exact noTitle>
            <Login />
          </Route>
          <Route
            path="/post/:id"
            render={({ match: { path, params: { id } } }) => {
              return (
                <>
                  <Route path={`${path}/`} component={ViewPost} exact/>
                  <Route path={`${path}/comment/:commentId`} component={ViewPost} />
                </>
              );
            }}
          />
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/createCommunity" exact>
            <CreateCommunity />
          </Route>
          <Route path="/communities" exact>
            <Communities />
          </Route>
          <Route path="/community/:communityId" exact>
            <Community />
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
        </Suspense>
    </Router>
  );
}

export default App;
