import { createContext, useContext, useState } from 'react';

// ✅ Create Context
const UserContext = createContext(null);

// ✅ Custom Hook
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used inside UserContextProvider');
  }

  return context;
};

// ✅ Provider
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const [token, setToken] = useState('')
   // 🔥 Auto update login when user changes
  const isAuthenticated = !!token;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
