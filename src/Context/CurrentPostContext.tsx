import React, { useState } from 'react';
import { Post } from '../types/Post';

type CurrentPostType = {
  selectedPost: Post | null;
  setSelectedPost: (postItem: Post | null) => void;

  unactivePost: boolean;
  setUnactivePost: (arg: boolean) => void;
};

export const CurrentPostContext = React.createContext<CurrentPostType>({
  selectedPost: null,
  setSelectedPost: () => {},

  unactivePost: false,
  setUnactivePost: () => {},
});

export const CurrentPostProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [unactivePost, setUnactivePost] = useState(true);

  return (
    <CurrentPostContext.Provider
      value={{ selectedPost, setSelectedPost, unactivePost, setUnactivePost }}
    >
      {children}
    </CurrentPostContext.Provider>
  );
};
