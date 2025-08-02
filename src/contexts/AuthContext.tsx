import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string>("");

  // API base URL - replace with your Django backend URL
  const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    // Check for existing token on app start
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      // Set default Authorization header for all axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login/`, {
        email,
        password,
      });

      const { access_token, user: userData } = response.data;
      
      setToken(access_token);
      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Set default Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup/`, {
        full_name: fullName,
        email,
        password,
      });

      // Store email for OTP verification
      setPendingEmail(email);
      
      // For demo purposes, we'll simulate immediate login
      // In real implementation, this would require OTP verification first
      setTimeout(async () => {
        try {
          await login(email, password);
        } catch (error) {
          console.error("Auto-login after signup failed:", error);
        }
      }, 1000);
      
    } catch (error: any) {
      console.error("Signup error:", error);
      throw new Error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp/`, {
        email: pendingEmail,
        otp,
      });

      const { access_token, user: userData } = response.data;
      
      setToken(access_token);
      setUser(userData);
      setPendingEmail("");
      
      // Store in localStorage
      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Set default Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      
    } catch (error: any) {
      console.error("OTP verification error:", error);
      throw new Error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setPendingEmail("");
    
    // Clear localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    
    // Remove Authorization header
    delete axios.defaults.headers.common["Authorization"];
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    verifyOTP,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};