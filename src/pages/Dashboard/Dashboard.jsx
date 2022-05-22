import { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/auth"
import Header from '../../components/Header/Header';
import './Dashboard.css';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <section className='dashboard'>
      {/* <div className='dashboard__header'>
        <h1>Bem vindo {user.name}</h1>
        <button onClick={() => signOut()} >Sair</button>
      </div> */}
      <Header />
      <div className='dashboard__main-content'>
        <div className='dashboard__cards-section'>
          <div className='dashboard__card'>
            <span>Usuários</span>
          </div>
          <div className='dashboard__card'>
            <span>Imagens</span>
          </div>
          <div className='dashboard__card'>
            <span>Funções</span>
          </div>
        </div>
      </div>
    </section>
  )
}