import React, { createContext, useState } from 'react';

export const authContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(false);

  const handleGivePermission = () => {
    setUser(true);
  };
  const handleCancelPermission = () => {
    setUser(true);
  };

  const sharedValues = {
    user,
    setUser,
    handleGivePermission,
    handleCancelPermission,
  };

  return (
    <authContext.Provider value={sharedValues}>
      {props.children}
    </authContext.Provider>
  );
};
