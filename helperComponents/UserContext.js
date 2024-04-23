import React, { createContext, useContext, useState } from 'react';
import { saveUserAsync } from '../helperComponents/Utilities';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    console.log("updating user context")
    setUser(userData);
    saveUserAsync(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
