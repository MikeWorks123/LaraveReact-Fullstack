import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  comments: [],
  suggestions: [],
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  setComments: () => {},
  setSuggestions: () => {},
  setContacts: () => {}
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [notification, _setNotification] = useState('');
  const [comments, setComments] = useState([]); // New state
  const [suggestions, setSuggestions] = useState([]); // New state
  const [contacts, setContacts] = useState([]); // New state

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('ACCESS_TOKEN', newToken);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const setNotification = (message) => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('');
    }, 5000);
  };

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      notification,
      setNotification,
      comments,
      setComments,
      suggestions,
      setSuggestions,
      contacts,
      setContacts,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
