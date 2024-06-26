// context/chats/ChatsProvider.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';

const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const { username, token } = useAuth();
  const [chats, setChats] = useState(null);
  const [singleChatId, setSingleChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Setting up Axios interceptor to include token in all requests
  useEffect(() => {

    console.log("Token in ChatsProvider:", token);
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Eject interceptor on cleanup
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]); // Re-run the effect if the token changes

  const getChats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://edumind-3587039ec3f2.herokuapp.com/v1/chat');
      if (response.status === 200) {
        setChats(response.data);
      } else {
        throw new Error('Failed to fetch chats');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Get chats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const newChat = async (subject, header) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://edumind-3587039ec3f2.herokuapp.com/v1/chat/new', {
        subject,
        header
      });
      if (response.status === 201) {
        getChats(); // Refresh chats list
      } else {
        throw new Error('Chat creation failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('New chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async () => {
    if (!singleChatId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://edumind-3587039ec3f2.herokuapp.com/v1/chat/${singleChatId}`);
      if (response.status === 200) {
        // Handle messages data
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Get messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSingleChatId = async (id) => {
    setSingleChatId(id);
    console.log("updating single chat id: " + id);
  }

  const newMessage = async (content) => {
    if (!singleChatId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`https://edumind-3587039ec3f2.herokuapp.com/v1/chat/${singleChatId}/new`, {
        content
      });
      if (response.status === 200) {
        console.log("message put success");
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.error('Create message error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChatsContext.Provider value={{ chats, singleChatId, setSingleChatId, getChats, newChat, getMessages, updateSingleChatId, newMessage, loading, error }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default function useChats() {
  return useContext(ChatsContext);
}