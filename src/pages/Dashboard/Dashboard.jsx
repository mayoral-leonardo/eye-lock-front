import React from "react";
import './Dashboard.css';
import { useHistory } from 'react-router';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from "../../components/Card/Card";
import { MenuOutlined } from "@ant-design/icons";

export default function Dashboard() {
  const history = useHistory();

  return (
    <section className='dashboard'>
      <Sidebar />
      <div className='dashboard__main-content'>
        <div className='dashboard__cards-section'>
          <Card title='Usuários' icon={<MenuOutlined/>}/>
          <Card title='Imagens' />
          <Card title='Funções' onClick={() => history.push('/functions')} />
        </div>
      </div>
    </section>
  )
}