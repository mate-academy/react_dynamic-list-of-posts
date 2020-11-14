/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export const AppContext = React.createContext({
  selectedPostId: 0,
  setSelectedPostId: () => {},
  userId: '0',
  setUserId: () => {},
});

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);

  const AppProps = {
    userId,
    setUserId,
    selectedPostId,
    setSelectedPostId,
  };

  return <AppContext.Provider value={AppProps}>{children}</AppContext.Provider>;
};
