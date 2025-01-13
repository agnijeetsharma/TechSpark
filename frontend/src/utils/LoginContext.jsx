import { createContext, useState, useContext } from "react";

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoginVisible, setLoginVisible] = useState(false);

  return (
    <LoginContext.Provider value={{ isLoginVisible, setLoginVisible }}>
      {children}
    </LoginContext.Provider>
  );
};
