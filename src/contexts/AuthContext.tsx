import React, { createContext, useState, useEffect, useContext } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if(response.ok) {
      const userData = await response.json();
      sessionStorage.setItem('user', JSON.stringify(userData.user));
      sessionStorage.setItem('token', userData.token);
      sessionStorage.setItem('email', userData.user.email);
      setUser(userData);
      return "";
    } else {
      const errorMessage = await response.text();
      return errorMessage;
    }
    
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
