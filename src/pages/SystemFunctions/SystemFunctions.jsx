import React from "react";
import './SystemFunctions.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Card from "../../components/Card/Card";

export default function SystemFunctions() {

  return (
    <section className='system-functions'>
      <Sidebar />
      <div className='system-functions__main-content'>
        <div className='system-functions__grid-content'>
          <Card title='Ar Condicionado' />
          <Card title='Ar Condicionado' />
          <Card title='Ar Condicionado' />
          <Card title='Ar Condicionado' />

        </div>
      </div>
    </section>
  )
}