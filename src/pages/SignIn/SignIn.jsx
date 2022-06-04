import React, { useState, useContext } from "react";
import '../UsersTable/UsersTable.css';
import { AuthContext } from "../../contexts/auth";
import './SignIn.css';
import logo from '../../assets/images/logo.png';
import { Modal } from 'antd';
import { validateEmail } from '../../utils/utils';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth, error, setError } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (error) {
        const errorMessage = error;
        setError(null)
        throw new Error(errorMessage);
      }
      if (email !== '' && password !== '') {
        if (validateEmail(email)) {
          signIn(email, password);
        } else {
          throw new Error('Por favor, insira um e-mail válido');
        }
      } else {
        throw new Error('Por favor, preencha todos os campos');
      }
    } catch (error) {
      console.log(error)
      Modal.error({
        className: 'users-table__info-modal',
        title: 'Atenção !',
        content: error.message,
      });
    }
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