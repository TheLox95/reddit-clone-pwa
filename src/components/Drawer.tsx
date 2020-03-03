import React, { useState } from 'react';
import { Drawer, NavBar, Icon, List } from 'antd-mobile';
import { Link, useLocation } from 'react-router-dom';
import { SmallBackground } from '../assets/SmallBackground';
import { SidemenuBottom } from '../assets/SidemuBottom';
import { BigBackground } from '../assets/BigBackground';
import { IoMdText, IoIosPeople } from 'react-icons/io';

const DrawerComponent: React.FC<{ background: 'sm' | 'bg' }> = ({ children, background = 'sm' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const screens = [
    { route: '/feed', name: 'Feed', icon: () => <IoMdText style={{ color: '#95bf74', fontSize: '0.9rem', marginLeft: '10%', marginRight: '5%' }} /> },
    { route: '/communities', name: 'Communities', icon: () => <IoIosPeople style={{ color: '#95bf74', fontSize: '0.9rem', marginLeft: '10%', marginRight: '5%'  }} /> },
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
        sidebarStyle={{ width: '60%', display: 'flex'}}
        sidebar={<List style={{ height: '100%', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {screens.map((i, index) => {
            return (<div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '15%'}}>
              {i.icon()}
              <Link onClick={() => setIsOpen(false)} to={i.route} style={{ color: '#95bf74', fontSize: '0.9rem', textDecoration: 'none' }}>
                {i.name.replace(/\//g, '')}
              </Link>
            </div>);
          })}
          <SidemenuBottom />
        </List>}
        open={true}
        onOpenChange={(c) => setIsOpen(!isOpen)}
      >
        {children}
      </Drawer>
    </>
  );
}

export default DrawerComponent;