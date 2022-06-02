import React, { useEffect, useState } from 'react'
import './UsersTable.css'
import avatar from '../../assets/images/avatar.png'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from 'react-router-dom';
import users from './consumer'
import { Button, Col, Input, Modal, Row, Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default function UsersTable() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

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
      render: text =>
        <Link
          className='users-table__name-tag'
        >{text}
        </Link>,
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

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        // setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      } else {
        alert('Envie uma imagem do tipo JPEG ou PNG');
        // setImageAvatar(null);
        return null;
      }
    }
  }

  function handleCancel() {
    setModalVisible(false);
  }

  function handleOk() {
    setAvatarUrl(null); 
    setModalVisible(false);
  }

  return (
    <section className='users-table'>
      <Sidebar />
      <div className='users-table__main-content'>
        <Modal
          className='users-table__modal'
          visible={modalVisible}
          title="Cadastro de usuário"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Enviar
            </Button>
          ]}
        >
          <Row gutter={[10, 10]}>
            <Col span={8}>
              <label className='users-table__avatar'>
                <span><UploadOutlined color='#FFFFFF' size={25} /></span>
                <Input type='file' accept='image/*' onChange={handleFile} />
                {avatarUrl === null ?
                  <img src={avatar} width='250' alt='Foto de perfil do usuário' />
                  : <img src={avatarUrl} width='250' alt='Foto de perfil do usuário' />
                }
              </label>
            </Col>
            <Col span={16}>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <label htmlFor='input-name' style={{ color: 'white' }}>Nome</label>
                  <Input type='text' id='input-name'></Input>
                </Col>
                <Col span={24}>
                  <label htmlFor='input-email' style={{ color: 'white' }}>E-mail</label>
                  <Input type='text' id='input-email'></Input>
                </Col>

              </Row>
            </Col>
          </Row>
        </Modal>

        <div className='users-table__main-content__button'>
          <Button
            type='primary'
            className='users-table__main-content__button__item'
            onClick={() => setModalVisible(true)}
          >
            Criar novo usuário
          </Button>
        </div>
        <div className='table-padding'>
          <Table
            className='users-table__table'
            rowClassName='users-table__table'
            loading={loading}
            columns={columns}
            dataSource={allUsers}
          />
        </div>
      </div>
    </section >
  )
}