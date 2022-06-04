import { useState, useEffect, createContext } from "react";
import authConsumer from "./authConsumer";
// import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingRegistration, setLoadingRegistration] = useState(false);

  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data))
  }


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
    try {
      const response = await authConsumer.signIn(email, password);
      setUser(response.user);
      if (response.user.level === 'admin') setIsAdmin(true);
      storageUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function residentSignUp(email, password, name) {
    setLoadingRegistration(true);
    try {
      const response = await authConsumer.residentSignUp(email, password, name);
      console.log(response.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRegistration(false);
    }
  }

  async function visitorSignUp(email, password, name) {
    setLoadingRegistration(true);
    try {
      const response = await authConsumer.visitorSignUp(email, password, name);
      console.log(response.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingRegistration(false);
    }
  }

  // Logout do usuário
  async function signOut() {
    await authConsumer.signOut();
    localStorage.removeItem('SistemaUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        isAdmin,
        loading,
        loadingAuth,
        loadingRegistration,
        residentSignUp,
        visitorSignUp,
        signOut,
        signIn,
        setUser,
        storageUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;