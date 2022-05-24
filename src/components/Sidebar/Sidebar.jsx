
import { Grid, Drawer } from 'antd';
import './Sidebar.css';

export default function Sidebar({ visible, onClose }) {
  const { useBreakpoint } = Grid;

  const { lg } = useBreakpoint();
  return (
    <Drawer
      title="Menu"
      placement="left"
      closable
      onClose={onClose}
      visible={visible}
      width={lg ? '30%' : '100%'}
    >
      <section className='sidebar'>
        <div className='sidebar__main-content'>
          <button>Usuários</button>
          <button>Funções</button>
          <button>Imagens</button>
        </div>
      </section>
    </Drawer>
  )
}