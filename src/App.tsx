import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import Top from './components/Drawer';
import Feed from './screens/Feed';

function App() {
  
  return (
    <Top>
      <Feed />
    </Top>
  );
}

export default App;
