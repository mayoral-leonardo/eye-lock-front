import api from '../../services/api';

const users = {
  show: async () => {
    try {
      const response = await api.get('/usuarios/all');
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
  
  find: async (id) => {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },

  create: async (params) => {
    try {
      const response = await api.post('/register', params);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },

  update: async (id, params) => {
    try {
      const response = await api.put(`/usuarios/update/${id}`, params);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/usuarios/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
}

export default users;