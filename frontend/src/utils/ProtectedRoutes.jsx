import { useEffect, useRef } from "react";
import { useLogin } from "../utils/LoginContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setLoginVisible } = useLogin();

  
  const hasShownLogin = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownLogin.current) {
      setLoginVisible(true);
      hasShownLogin.current = true;
    }
  }, [isAuthenticated, setLoginVisible]);

  if (!isAuthenticated) {
    return <div className="text-center">Please login to access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
