import React, { useEffect, useState } from 'react'
import './UsersTable.css'
import avatar from '../../assets/images/avatar.png'
import Sidebar from "../../components/Sidebar/Sidebar";
import users from './consumer'
import { Button, Col, Input, Modal, Row, Select, Spin, Table, Tag } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


export default function UsersTable() {
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [update, setUpdate] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [nameStatus, setNameStatus] = useState('');
  const [levelStatus, setLevelStatus] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [name, setName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [option, setOption] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

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

  function validateEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  async function getSpecificUser(id) {
    setSelectedUser(id);
    try {
      const response = await users.find(id);

      if (response) {
        setName(response.name);
        setEmail(response.email);
        setSelectedLevel(response.level);
        setAvatarUrl(!response.avatar || response.avatar === '' ? null : response.avatar);
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
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
  }, [update])

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '300px',
      render: (name, row) => {
        return (
          <span
            className='users-table__name-tag'
            onClick={() => {
              setOption('edit')
              getSpecificUser(row.id)
            }}
          >{(name)}
          </span>
        )
      }
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
      filters: [
        {
          text: 'Residentes',
          value: 'resident',
        },
        {
          text: 'Visitantes',
          value: 'visitor',
        },
      ],
      onFilter: (value, record) => record.level.indexOf(value) === 0,
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



  function resetAllFields() {
    setName('');
    setEmail('');
    setPassword('');
    setSelectedLevel('');
    setAvatarUrl(null);
  }

  function handleCancel() {
    setModalVisible(false);
    resetAllFields();
  }

  async function handleEdit() {
    setLoadingSubmit(true);
    const params = {
      name: name,
      level: selectedLevel,
      email: email,
      avatar: avatarUrl
    }
    try {
      if (name === '') {
        setNameStatus('error');
        throw new Error('Por favor, preencha o nome do usuário');
      }

      if (selectedLevel === '') {
        setLevelStatus('error');
        throw new Error('Por favor, escolha o nível de acesso do usuário');
      }

      const response = await users.update(selectedUser, params);
      alert(response.message);
      setModalVisible(false);
      resetAllFields();
      setUpdate(!update);
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
    setLoadingSubmit(false);
  }

  async function handleCreate() {
    setLoadingSubmit(true);
    const params = {
      name: name,
      level: selectedLevel,
      email: email,
      password: password,
      avatar: avatarUrl
    }
    try {
      if (name === '') {
        setNameStatus('error');
        throw new Error('Por favor, preencha o nome do usuário');
      }
      if (email === '') {
        setEmailStatus('error');
        throw new Error('Por favor, preencha o e-mail do usuário');
      } else if (!validateEmail(email)) {
        setEmailStatus('error');
        throw new Error('Por favor, insira um e-mail válido');
      }
      if (password === '') {
        setPasswordStatus('error');
        throw new Error('Por favor, preencha a senha do usuário');
      }
      if (selectedLevel === '') {
        setLevelStatus('error');
        throw new Error('Por favor, escolha o nível de acesso do usuário');
      }

      const response = await users.create(params);
      alert(response.message);
      setModalVisible(false);
      resetAllFields();
      setUpdate(!update);
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
    setLoadingSubmit(false);
  }

  return (
    <section className='users-table'>
      <Sidebar />
      <div className='users-table__main-content'>
        <Modal
          className='users-table__modal'
          visible={modalVisible}
          title={option === 'edit' ? 'Editar usuário' : 'Cadastrar usuário'}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={option === 'edit' ? handleEdit : handleCreate}
            >
              {loadingSubmit ? <Spin /> : 'Enviar'}
            </Button>
          ]}
        >
          <Row gutter={[10, 10]}>
            <Col span={8}>
              <label className='users-table__avatar'>
                <span><UploadOutlined color='#FFFFFF' size={25} /></span>
                <Input type='file' accept='image/*' onChange={handleFile} />
                {avatarUrl === null || avatarUrl === '' ?
                  <img src={avatar} width='250' alt='Foto de perfil do usuário' />
                  : <img src={avatarUrl} width='250' alt='Foto de perfil do usuário' />
                }
              </label>
            </Col>
            <Col span={16}>
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <label htmlFor='input-name' style={{ color: 'white' }}>Nome</label>
                  <Input
                    type='text'
                    id='input-name'
                    status={nameStatus}
                    value={name}
                    onChange={element => {
                      setNameStatus('');
                      setName(element.target.value)
                    }}></Input>
                </Col>
                {option === 'create' && <Col span={24}>
                  <label htmlFor='input-email' style={{ color: 'white' }}>E-mail</label>
                  <Input
                    type='text'
                    id='input-email'
                    status={emailStatus}
                    value={email}
                    onChange={element => {
                      setEmailStatus('');
                      setEmail(element.target.value)
                    }}></Input>
                </Col>}

                {option === 'create' && <Col span={24}>
                  <label htmlFor='input-password' style={{ color: 'white' }}>Senha</label>
                  <Input
                    type='text'
                    id='input-password'
                    status={passwordStatus}
                    value={password}
                    onChange={element => {
                      setPasswordStatus('');
                      setPassword(element.target.value)
                    }}></Input>
                </Col>}
                <Col span={24}>
                  <label htmlFor='input-level' style={{ color: 'white', marginRight: '15px' }}>Nível de acesso</label>
                  <Select
                    placeholder='Selecione o nível de acesso'
                    value={selectedLevel}
                    status={levelStatus}
                    className='users-table__select'
                    onChange={(element) => setSelectedLevel(element)}
                  >
                    <Select.Option value='resident'>Residente</Select.Option>
                    <Select.Option value='visitor'>Visitante</Select.Option>
                  </Select>
                </Col>

              </Row>
            </Col>
          </Row>
        </Modal>

        <div className='users-table__main-content__button'>
          <Button
            type='primary'
            className='users-table__main-content__button__item'
            onClick={() => {
              setOption('create')
              setModalVisible(true)
            }}
          >
            Criar novo usuário
          </Button>
        </div>
        <div className='table'>
          <Table
            className='users-table__table'
            rowClassName='users-table__row-color'
            loading={loading}
            columns={columns}
            dataSource={allUsers}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
          />
        </div>
      </div>
    </section >
  )
}