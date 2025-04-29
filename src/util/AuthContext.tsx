import { createContext, useContext, useState, useEffect } from "react";
import { UserInfoResponse } from "../api/interface/Responses";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
interface AuthContextType {
    user: UserInfoResponse | null;
    setUser: (user: UserInfoResponse | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook dùng context dễ hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được dùng trong AuthProvider');
  }
  return context;
};



// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfoResponse | null>(null);

  // Khi mở app, lấy user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mỗi khi user thay đổi thì lưu vào localStorage
  useEffect(() => {
    console.log('User state changed:', user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = async () => {
        const response = await fetch(`http://localhost:8080/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            setUser(null);
            localStorage.removeItem('user');
        }else {
            toast.error('Logout failed');
        }
    }


  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};