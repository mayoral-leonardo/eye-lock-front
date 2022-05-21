import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import './SignIn.css';
import logo from '../../assets/images/logo.png';
// import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    if(email !== '' && password !== '') signIn(email, password);
    // if(email === '') toast.error('Insira o e-mail !');
    // if(email !== '' && password === '') toast.error('Insira a senha !');
  }

  return (
    <div className='login__container'>
      <div className='login__area'>
        <div className='login__logo'>
          <img src={logo} alt='Logo do Sistema' />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type='text' placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
        </form>
        <span className="login__inform">Não possui um acesso ? Solicite um login ao administrador do sistema !</span>
      </div>
    </div>
  )
}