// src/utils/LoginContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setLoginVisible(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <LoginContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoginVisible,
        setLoginVisible,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
