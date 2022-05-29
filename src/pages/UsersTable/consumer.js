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
  }
}

export default users;