import { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/auth"

export default function Dashboard() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()} >Sair</button>
    </div>
  )
}