
import { Grid, Drawer } from 'antd';
import './Sidebar.css';

export default function Sidebar({ visible, onClose }) {
  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();
  return (
    <section className='sidebar'>
      <Drawer
        drawerStyle={{backgroundColor: '#181C2E'}}
        headerStyle={{backgroundColor: 'aqua'}}
        title="Sistema"
        placement="left"
        closable
        onClose={onClose}
        visible={visible}
        width={lg ? '12%' : '100%'}
      >
        <div className='sidebar__main-content'>
          <button className='sidebar__main-content__button'>Usuários</button>
          <button className='sidebar__main-content__button'>Funções</button>
          <button className='sidebar__main-content__button'>Imagens</button>
        </div>
      </Drawer>
    </section>
  )
}