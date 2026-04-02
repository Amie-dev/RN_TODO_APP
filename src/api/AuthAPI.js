import axios from 'axios';

const BASE_URL = 'https://api.freeapi.app/api/v1/users';

export class Auth {
  // ✅ REGISTER
  static async register(data) {
    try {
      const res = await axios.post(`${BASE_URL}/register`, data);
      return res.data;
    } catch (error) {
      console.log('Register Error:', error?.response?.data || error.message);
      throw error;
    }
  }

  // ✅ LOGIN
  static async login(data) {
    try {
      const res = await axios.post(`${BASE_URL}/login`, data);
      return res.data;
    } catch (error) {
      console.log('Login Error:', error?.response?.data || error.message);
      throw error;
    }
  }

  // ✅ LOGOUT (optional API)
  static async logout(token) {
    try {
      const res = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log('Logout Error:', error?.response?.data || error.message);
      throw error;
    }
  }

  // ✅ Current User (IMPORTANT 🔥)
  static async Current_User(token) {
    try {
      // 👉 use any protected API endpoint
      const res = await axios.get(`${BASE_URL}/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data
    } catch (error) {
      return false; // ❌ invalid or expired token
    }
  }
}