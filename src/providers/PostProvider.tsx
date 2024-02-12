import React, { useMemo } from 'react';
import { Post } from '../types/Post';

type SelectedPostContextType = {
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const SelectedPostContext = React
  .createContext<SelectedPostContextType>({
  selectedPost: null,
  setSelectedPost: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const SelectedPostProvider: React.FC<Props> = ({ children }) => {
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const value = useMemo(() => (
    {
      selectedPost,
      setSelectedPost,
    }
  ), [selectedPost, setSelectedPost]);

  return (
    <SelectedPostContext.Provider value={value}>
      {children}
    </SelectedPostContext.Provider>
  );
};
