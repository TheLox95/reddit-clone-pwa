import React, { useState } from 'react';
import { Drawer, NavBar, Icon, List } from 'antd-mobile';
import { Link, useLocation } from 'react-router-dom';

const DrawerComponent: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screens = [
    { name: '/feed' },
    { name: '/createPost' },
  ];
  const location = useLocation()
  return (
    <>
      <NavBar style={{ minHeight: '2.5rem', zIndex: 1 }} className="navBar" icon={<Icon type="ellipsis" />} onLeftClick={(c) => setIsOpen(!isOpen)}>
        {location.pathname === '/' ? null: 'Reddit Clone'}
      </NavBar>
      <div>
        <svg className="navBar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#108ee9" fill-opacity="1" d="M0,192L30,197.3C60,203,120,213,180,229.3C240,245,300,267,360,245.3C420,224,480,160,540,154.7C600,149,660,203,720,192C780,181,840,107,900,96C960,85,1020,139,1080,149.3C1140,160,1200,128,1260,138.7C1320,149,1380,203,1410,229.3L1440,256L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
      </div>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight, flex: 1 }}
        enableDragHandle
        contentStyle={{ color: 'black', textAlign: 'center', display: 'flex', flexDirection: 'column' }}
        sidebar={<List>
          {screens.map((i, index) => {
            return (<List.Item key={index}>
              <Link onClick={() => setIsOpen(false)} to={i.name} style={{ textDecoration: 'none' }}>
                {i.name.replace(/\//g, '')}
              </Link>
            </List.Item>);
          })}
        </List>}
        open={isOpen}
        onOpenChange={(c) => setIsOpen(!isOpen)}
      >
        {children}
      </Drawer>
    </>
  );
}

export default DrawerComponent;