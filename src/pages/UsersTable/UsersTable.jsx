import React, { useEffect, useState } from 'react'
import './UsersTable.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import users from './consumer'
import { translateLevels, validateEmail, validateErrors } from '../../utils/utils';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Select, Spin, Table, Tag } from 'antd';

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


  const [name, setName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [option, setOption] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  async function getSpecificUser(id) {
    setSelectedUser(id);
    try {
      const response = await users.find(id);

      if (response) {
        setName(response.name);
        setEmail(response.email);
        setSelectedLevel(response.level);
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
      title: 'N??vel de acesso',
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

    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: '80px',
      align: 'center',
      render: (id) => {
        return (
          <Button
            type='primary'
            className='users-table__delete-button'
            onClick={() => {
              Modal.confirm({
                className: 'users-table__delete-modal',
                title: 'Excluir usu??rio',
                content: 'Tem certeza que deseja excluir este usu??rio?',
                okText: 'Sim',
                cancelText: 'N??o',
                onOk: () => handleDelete(id)
              });
            }}
          >
            <DeleteOutlined />
          </Button>)
      }
    }

  ];

  function resetAllFields() {
    setName('');
    setEmail('');
    setPassword('');
    setSelectedLevel('');
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

    }
    try {
      if (name === '') {
        setNameStatus('error');
        throw new Error('Por favor, preencha o nome do usu??rio');
      }

      if (selectedLevel === '') {
        setLevelStatus('error');
        throw new Error('Por favor, escolha o n??vel de acesso do usu??rio');
      }

      const response = await users.update(selectedUser, params);
      Modal.success({
        className: 'users-table__info-modal',
        title: 'Sucesso !',
        content: response.message,
      });
      setModalVisible(false);
      resetAllFields();
      setUpdate(!update);
    } catch (error) {
      console.log(error)
      Modal.error({
        className: 'users-table__info-modal',
        title: 'Aten????o !',
        content: error.message,
      });
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

    }
    try {
      if (name === '') {
        setNameStatus('error');
        throw new Error('Por favor, preencha o nome do usu??rio');
      }
      if (email === '') {
        setEmailStatus('error');
        throw new Error('Por favor, preencha o e-mail do usu??rio');
      } else if (!validateEmail(email)) {
        setEmailStatus('error');
        throw new Error('Por favor, insira um e-mail v??lido');
      }
      if (password === '') {
        setPasswordStatus('error');
        throw new Error('Por favor, preencha a senha do usu??rio');
      }
      if (selectedLevel === '') {
        setLevelStatus('error');
        throw new Error('Por favor, escolha o n??vel de acesso do usu??rio');
      }

      const response = await users.create(params);
      
      if (response.error) {
        const errorMessage = validateErrors(response.error);
        throw new Error(errorMessage);
      }

      Modal.success({
        className: 'users-table__info-modal',
        title: 'Sucesso !',
        content: response.message,
      });
      setModalVisible(false);
      resetAllFields();
      setUpdate(!update);
    } catch (error) {
      console.log(error)
      Modal.error({
        className: 'users-table__info-modal',
        title: 'Aten????o !',
        content: error.message,
      });
    }
    setLoadingSubmit(false);
  }

  async function handleDelete(id) {
    setLoadingSubmit(true);
    try {
      const response = await users.delete(id);
      Modal.success({
        className: 'users-table__info-modal',
        title: 'Sucesso !',
        content: response.message,
      });
      setModalVisible(false);
      resetAllFields();
      setUpdate(!update);
    } catch (error) {
      console.log(error)
      Modal.error({
        className: 'users-table__info-modal',
        title: 'Aten????o !',
        content: error.message,
      });
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
          title={option === 'edit' ? 'Editar usu??rio' : 'Cadastrar usu??rio'}
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

            <Col span={24}>
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
                    type='password'
                    id='input-password'
                    status={passwordStatus}
                    value={password}
                    onChange={element => {
                      setPasswordStatus('');
                      setPassword(element.target.value)
                    }}></Input>
                </Col>}
                <Col span={24}>
                  <label htmlFor='input-level' style={{ color: 'white', marginRight: '15px' }}>N??vel de acesso</label>
                  <Select
                    placeholder='Selecione o n??vel de acesso'
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
            Criar novo usu??rio
          </Button>
        </div>
        <div className='table'>
          <Table
            className='users-table__table'
            rowClassName='users-table__row-color'
            loading={loading}
            columns={columns}
            dataSource={allUsers}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 320 }}
          />
        </div>
      </div>
    </section >
  )
}