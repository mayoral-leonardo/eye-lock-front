import React, { useEffect, useState } from 'react'
import './UsersTable.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from 'react-router-dom';
import users from './consumer'
import { Table, Tag } from 'antd';

export default function UsersTable() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  function translateLevels(level) {
    switch (level) {
      case 'resident':
        return 'Residente'
      case 'visitor':
        return 'Visitante'
      default:
        return 'Usuário'
    }
  }

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      try {
        const response = await users.show();
        setAllUsers(response);
        console.log(response)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    getUsers();
  }, [])

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '300px',
      render: text => <Link>{text}</Link>,
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '300px',
    },

    {
      title: 'Nível de acesso',
      dataIndex: 'level',
      key: 'level',
      width: '200px',
      align: 'center',
      render: level => <Tag color={level === 'resident' ? 'darkgreen' : 'darkblue'} key={level}>{translateLevels(level)}</Tag>,
    },

  ];

  return (
    <section className='users-table'>
      <Sidebar />
      <div className='users-table__main-content'>
        <Table
          className='users-table__table'
          rowClassName='users-table__table'          
          loading={loading}
          columns={columns}
          dataSource={allUsers}
        />
      </div>
    </section>
  )
}