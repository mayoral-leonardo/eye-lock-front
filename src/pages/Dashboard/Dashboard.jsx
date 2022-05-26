import React from "react";
import './Dashboard.css';
import { useHistory } from 'react-router';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Dashboard() {
  const history = useHistory();

  return (
    <section className='dashboard'>
      <Sidebar/>
      <div className='dashboard__main-content'>
        <div className='dashboard__cards-section'>
          <div className='dashboard__card'>
            <span>Usuários</span>
          </div>
          <div className='dashboard__card'>
            <span>Imagens</span>
          </div>
          <div
            className='dashboard__card'
            onClick={() => history.push('/functions')}
          >
            <span>Funções</span>
          </div>
        </div>
      </div>
    </section>
  )
}