import React, { useState } from 'react';

export interface LoadContextType {
  loading: boolean;
  setLoading: (user: boolean) => void;
}

export const UserLoaderContext = React.createContext<LoadContextType>({
  loading: false,
  setLoading: () => {},
});

export const UserLoaderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <UserLoaderContext.Provider
      value={{
        loading: loading,
        setLoading: (load: boolean) => setLoading(load),
      }}
    >
      {children}
    </UserLoaderContext.Provider>
  );
};
