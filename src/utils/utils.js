export function translateLevels(level) {
  switch (level) {
    case 'resident':
      return 'Residente'
    case 'visitor':
      return 'Visitante'
    default:
      return 'Usuário'
  }
}

export function validateEmail(email) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  return (false)
}

export function validateErrors (error) {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Usuário não encontrado'
    case 'auth/wrong-password':
      return 'Senha incorreta'
    case 'auth/email-already-in-use':
      return 'Email já cadastrado'
    case 'auth/weak-password':
      return 'Senha muito fraca'
    case 'auth/invalid-email':
      return 'Email inválido'
    default:
      return 'Erro desconhecido'
  }
}