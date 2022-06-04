import React, {useContext} from "react";
import './Dashboard.css';
import { useHistory } from 'react-router';
import { AuthContext } from "../../contexts/auth"
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from "../../components/Card/Card";
import { AppstoreOutlined, TeamOutlined } from "@ant-design/icons";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  return (
    <section className='dashboard'>
      <Sidebar />
      <div className='dashboard__main-content'>
        <div className='dashboard__cards-section'>
          <Card title='Funções' icon={<AppstoreOutlined className='dashboard__icon'/>} onClick={() => history.push('/functions')} />
          {user.level === 'admin' && <Card title='Usuários' icon={<TeamOutlined className='dashboard__icon'/>} onClick={() => history.push('/users')}/>}
        </div>
      </div>
    </section>
  )
}