/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export const AppContext = React.createContext({
  selectedPostId: 0,
  setSelectedPostId: () => {},
  userId: '0',
  setUserId: () => {},
  detailsLoader: false,
  setDetailsLoader: () => {},
});

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState('0');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [detailsLoader, setDetailsLoader] = useState(false);

  const AppProps = {
    userId,
    setUserId,
    selectedPostId,
    setSelectedPostId,
    detailsLoader,
    setDetailsLoader,
  };

  return <AppContext.Provider value={AppProps}>{children}</AppContext.Provider>;
};
