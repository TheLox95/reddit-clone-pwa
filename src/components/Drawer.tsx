import React, { useState } from 'react';
import { Drawer, NavBar, Icon, List } from 'antd-mobile';
import { Link, useLocation } from 'react-router-dom';
import { SmallBackground } from '../assets/SmallBackground';
import { BigBackground } from '../assets/BigBackground';

const DrawerComponent: React.FC<{ background: 'sm' | 'bg' }> = ({ children, background = 'sm' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screens = [
    { name: '/feed' },
    { name: '/createPost' },
    { name: '/register' },
    { name: '/post' },
  ];
  const location = useLocation()
  return (
    <>
      <NavBar style={{ position: 'absolute', backgroundColor: "unset", left: 0, right: 0, zIndex: 1 }} className="navBar" icon={<Icon type="ellipsis" />} onLeftClick={(c) => setIsOpen(!isOpen)}>
        {location.pathname.match(/^(\/)$|(register)/)  ? null: 'Reddit Clone'}
      </NavBar>
      {background === 'sm' ? <SmallBackground /> : <BigBackground />}
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight, flex: 1, marginTop: "15%" }}
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