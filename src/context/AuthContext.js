import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from '../api/AuthAPI';

const UserContext = createContext(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used inside Provider');
  }
  return context;
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ AUTO LOGIN ON APP START
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');

        if (!savedToken) {
          setLoading(false);
          return;
        }

        const parsedToken = JSON.parse(savedToken);

        // 🔥 VERIFY TOKEN + GET USER
        const res = await Auth.Current_User(parsedToken);
        console.log('Current User as res', res);

        const currentUser = res.data; // ✅ depends on your API
        console.log('Currents user', currentUser);
        // ✅ set state directly

        if (currentUser) {
          setUser(currentUser);
          setToken(parsedToken);
          // ✅ optionally update storage
          await AsyncStorage.setItem('user', JSON.stringify(currentUser));
        } else {
          await logout();
        }
      } catch (error) {
        console.log('Token invalid or expired', error);

        // ❌ force logout if token invalid
        await logout();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ✅ LOGIN
  const login = async (userData, tokenData) => {
    setUser(userData); // ✅ FIXED
    setToken(tokenData);

    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('token', JSON.stringify(tokenData));
  };

  // ✅ LOGOUT
  const logout = async () => {
    setUser(null);
    setToken(null);

    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
  };

  const isAuthenticated = !!token && !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
