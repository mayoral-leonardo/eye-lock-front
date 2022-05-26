import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { AuthContext } from "../../contexts/auth"
import './Header.css';

export default function Header({ onClick }) {
  const { user, signOut } = useContext(AuthContext);
  return (
    <header className='header'>
      <MenuOutlined className='header__menu-icon' onClick={onClick}/>
      <button className='header__items__buttons__item' onClick={() => signOut()} >Sair</button>
    </header>
  )
}