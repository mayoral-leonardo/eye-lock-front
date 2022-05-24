import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/auth"
import './Header.css';

export default function Header({onClick}) {
  const { user, signOut } = useContext(AuthContext);
  return (
    <header className='header'>
      <button className='header__items__buttons__item' onClick={onClick}>Eye Lock</button>

      <div className='header__items'>
        <div className='header__items__buttons'>
          <Link className='header__items__buttons__item' to='/'>Usuários</Link>
          <Link className='header__items__buttons__item' to='/'>Imagens</Link>
          <Link className='header__items__buttons__item' to='/'>Funções</Link>
        </div>
        <button className='header__items__buttons__item' onClick={() => signOut()} >Sair</button>
      </div>
    </header>
  )
}