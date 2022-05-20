import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../contexts/auth";
import logo from '../../assets/images/logo.png';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if(name !== '' && email !== '' && password !== ''){
      // signUp(email, password, name)
    }
  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='logo-area'>
          <img src={logo} alt='Logo do Sistema' />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastro</h1>
          <input type='text' placeholder='Seu nome' value={name} onChange={(e) => setName(e.target.value)}></input>
          <input type='text' placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button> */}
          <button type='submit'>Acessar</button>
        </form>

        <Link to='/'>Já tenho uma conta</Link>

      </div>
    </div>
  )
}