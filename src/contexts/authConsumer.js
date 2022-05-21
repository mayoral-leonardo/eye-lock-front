import api from "../services/api";

const authConsumer = {
  signIn: async (email, password) => {
    try {
      const response = await api.post('/login', {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },

  residentSignUp: async (email, password, name) => {
    try {
      const response = await api.post('/register/resident', {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
  
  visitorSignUp: async (email, password, name) => {
    try {
      const response = await api.post('/register/visitor', {
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  },
  signOut: async () => {
    try {
      const response = await api.post('/logout');
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
}

export default authConsumer;