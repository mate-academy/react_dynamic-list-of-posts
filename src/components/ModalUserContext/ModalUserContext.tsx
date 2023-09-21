import React, { useState } from 'react';
import { User } from '../../types/User';

type MUC = {
  modalUser: User | null;
  setModalUser: (user: User | null) => void;
};

const DEFAULT_MODAL_USER: MUC = {
  modalUser: null,
  setModalUser: () => { },
};

export const ModalUserContext = React.createContext<MUC>(DEFAULT_MODAL_USER);

type Props = {
  children: React.ReactNode;
};

export const ModalUserProvider: React.FC<Props> = ({ children }) => {
  const [modalUser, setModalUser] = useState<User | null>(null);

  return (
    <ModalUserContext.Provider value={{ modalUser, setModalUser }}>
      {children}
    </ModalUserContext.Provider>
  );
};
