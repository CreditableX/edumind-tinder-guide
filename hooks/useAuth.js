import { View, Text, Alert } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext({
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // signup function
  const signup = async (username, password, name) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/students/register', {
        username,
        password,
        name
      });

      if (response.status === 201) {
        // Assuming the API returns the user data upon successful signup
        // do nothing for now
        return true;
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // login function
  const login = async (username, password) => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/login', {
        username,
        password
      });
      if (response.status === 200) {
        // Assuming the API returns user data upon successful login
        if (response.data.user_type == 'student') {
          const r = await axios.get('https://edumind-3587039ec3f2.herokuapp.com/v1/students/profile')
          setName(r.data.name);
        }
        setUser(response.data.username);
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {

      setError(err.response?.data?.message || err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // logout function
  const logout = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('https://edumind-3587039ec3f2.herokuapp.com/v1/logout');
      if (response.status === 200) {
        setUser(null);
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };


return (
  <AuthContext.Provider
    value={{
      user,
      loading,
      error,
      signup,
      login,
      logout,
    }}
  >
    {children}
  </AuthContext.Provider>
)
}

export default function useAuth() {
  return useContext(AuthContext);
}