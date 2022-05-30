import React from "react";
import './Dashboard.css';
import { useHistory } from 'react-router';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from "../../components/Card/Card";
import { AppstoreOutlined, FileImageOutlined, TeamOutlined } from "@ant-design/icons";

export default function Dashboard() {
  const history = useHistory();

  return (
    <section className='dashboard'>
      <Sidebar />
      <div className='dashboard__main-content'>
        <div className='dashboard__cards-section'>
          <Card title='Funções' icon={<AppstoreOutlined className='dashboard__icon'/>} onClick={() => history.push('/functions')} />
          <Card title='Imagens' icon={<FileImageOutlined className='dashboard__icon'/>}/>
          <Card title='Usuários' icon={<TeamOutlined className='dashboard__icon'/>} onClick={() => history.push('/users')}/>
        </div>
      </div>
    </section>
  )
}