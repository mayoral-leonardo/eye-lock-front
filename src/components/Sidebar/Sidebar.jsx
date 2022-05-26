import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Grid, Drawer } from 'antd';
import './Sidebar.css';

export default function Sidebar() {
  const { useBreakpoint } = Grid;
  const [showDrawer, setShowDrawer] = useState(false);


  const { lg } = useBreakpoint();
  return (
    <>
      <Header onClick={() => setShowDrawer(true)} />
      <section className='sidebar'>
        <Drawer
          drawerStyle={{ backgroundColor: '#181C2E' }}
          headerStyle={{ backgroundColor: 'aqua' }}
          title="Eye-Lock"
          placement="left"
          closable
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          width={lg ? '12%' : '100%'}
        >
          <div className='sidebar__main-content'>
            <Link to='/' className='sidebar__main-content__button'>Dashboard</Link>
            <button className='sidebar__main-content__button'>Usuários</button>
            <Link to='/functions' className='sidebar__main-content__button'>Funções</Link>
            <button className='sidebar__main-content__button'>Imagens</button>
          </div>
        </Drawer>
      </section>
    </>
  )
}