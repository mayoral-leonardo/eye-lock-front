import { useState, useEffect, createContext } from "react";
import firebase from '../services/firebaseConnection';
// import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem('SistemaUser');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }
    loadStorage();
  }, [])

  // Login de usuários já cadastrados
  async function signIn(email, password) {
    setLoadingAuth(true);
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const userProfile = await firebase.firestore().collection('users').doc(uid).get();

        let data = {
          uid: uid,
          name: userProfile.data().name,
          avatarUrl: userProfile.data().avatarUrl,
          email: value.user.email
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        // toast.success('Bem-vindo(a) de volta !');
      })
      .catch((error) => {
        console.log(error);
        // if(error.code === 'auth/invalid-email') toast.error('E-mail inválido !');
        // else if(error.code === 'auth/wrong-password') toast.error('Senha incorreta !');
        if(error.code === 'auth/invalid-email') alert('E-mail inválido !');
        else if(error.code === 'auth/wrong-password') alert('Senha incorreta !');
        // else toast.error('Ops... algo deu errado !');
        else alert('Ops... algo deu errado !');
        setLoadingAuth(false)
      })
  }

  // Cadastro de usuários
  async function signUp(email, password, name) {
    setLoadingAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await firebase.firestore().collection('users')
          .doc(uid).set({
            name: name,
            avatarUrl: null,
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
              avatarUrl: null
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            // toast.success('Bem-vindo(a) à plataforma !');
            alert('Bem-vindo(a) à plataforma !');
          })
      })
      .catch((error) => {
        console.log(error);
        // if(error.code === 'auth/invalid-email') toast.error('E-mail inválido !');
        // else if(error.code === 'auth/weak-password') toast.error('A senha precisa conter, no mínimo, 6 carateres !');
        // else toast.error('Ops... algo deu errado !');
        if(error.code === 'auth/invalid-email') alert('E-mail inválido !');
        else if(error.code === 'auth/weak-password') alert('A senha precisa conter, no mínimo, 6 carateres !');
        else alert('Ops... algo deu errado !');
        setLoadingAuth(false)
      })
  }

  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data))
  }

  // Logout do usuário
  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
        signIn,
        loadingAuth,
        setUser,
        storageUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;