import axios from 'axios';

const BASE_URL = 'https://api.freeapi.app/api/v1/users';

export class Auth {

  // ✅ Register API
  static async register(data) {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data);
      return response.data;
    } catch (error) {
      console.log('Register Error:', error?.response?.data || error.message);
      throw error;
    }
  }

  // ✅ Login API
  static async login(data) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, data);
      return response.data;
    } catch (error) {
      console.log('Login Error:', error?.response?.data || error.message);
      throw error;
    }
  }
}