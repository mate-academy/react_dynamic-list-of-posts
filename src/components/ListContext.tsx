import React, { useState, useMemo } from 'react';

interface ListContextType {
  idUserActive: number,
  setIdUserActive: (idUserActive: number) => void,
  errorMessagePosts: string,
  setErrorMessagePosts: (errorMessagePosts: string) => void,
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  idSelectedPost: number,
  setIdSelectedPost: (idSelectedPost: number) => void,
}

export const ListContext = React.createContext<ListContextType>({
  idUserActive: -1,
  setIdUserActive: () => { },
  errorMessagePosts: '',
  setErrorMessagePosts: () => { },
  isLoading: false,
  setIsLoading: () => { },
  idSelectedPost: -1,
  setIdSelectedPost: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const ListProvider: React.FC<Props> = ({ children }) => {
  const [idUserActive, setIdUserActive] = useState(-1);
  const [errorMessagePosts, setErrorMessagePosts] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [idSelectedPost, setIdSelectedPost] = useState(-1);

  const value = useMemo(() => ({
    idUserActive,
    setIdUserActive,
    errorMessagePosts,
    setErrorMessagePosts,
    isLoading,
    setIsLoading,
    idSelectedPost,
    setIdSelectedPost,
  }), [idUserActive, errorMessagePosts, isLoading, idSelectedPost]);

  return (
    <ListContext.Provider value={value}>
      {children}
    </ListContext.Provider>
  );
};
