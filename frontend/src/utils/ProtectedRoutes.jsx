import { useEffect, useRef } from "react";
import { useLogin } from "../utils/LoginContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setLoginVisible } = useLogin();

  // 🛑 Prevent multiple state updates with a ref
  const hasShownLogin = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownLogin.current) {
      setLoginVisible(true);
      hasShownLogin.current = true; // ✅ prevent re-triggering
    }
  }, [isAuthenticated, setLoginVisible]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
