import './ErrorPage.css'
import { Link } from 'react-router-dom'

export default function ErrorPage () {
  return (
    <div className='not-found'>
      <h1>404</h1>
      <h2>Página não encontrada !</h2>
      <Link to='/'>Voltar à página inicial </Link>
    </div>
  )
} 