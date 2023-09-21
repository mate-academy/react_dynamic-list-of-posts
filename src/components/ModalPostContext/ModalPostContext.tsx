import React, { useState } from 'react';
import { Post } from '../../types/Post';

type MPC = {
  modalPost: Post | null;
  setModalPost: (post: Post | null) => void;
};

const DEFAULT_MODAL_POST: MPC = {
  modalPost: null,
  setModalPost: () => { },
};

export const ModalPostContext = React.createContext<MPC>(DEFAULT_MODAL_POST);

type Props = {
  children: React.ReactNode;
};

export const ModalPostProvider: React.FC<Props> = ({ children }) => {
  const [modalPost, setModalPost] = useState<Post | null>(null);

  return (
    <ModalPostContext.Provider value={{ modalPost, setModalPost }}>
      {children}
    </ModalPostContext.Provider>
  );
};
