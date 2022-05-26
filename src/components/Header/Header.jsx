import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/auth"
import './Header.css';

export default function Header({ onClick }) {
  const { user, signOut } = useContext(AuthContext);
  return (
    <header className='header'>
      <button className='header__items__buttons__item' onClick={onClick}>Eye Lock</button>
      <button className='header__items__buttons__item' onClick={() => signOut()} >Sair</button>
    </header>
  )
}