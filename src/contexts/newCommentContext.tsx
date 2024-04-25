/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';

type CommentContextType = {
  formNameError: boolean;
  setFormNameError: (formNameError: boolean) => void;
  formEmailError: boolean;
  setFormEmailError: (formNameError: boolean) => void;
  formTextError: boolean;
  setFormTextError: (formNameError: boolean) => void;
  loadingAddComment: boolean;
  setLoadingAddComment: (loadingAddComment: boolean) => void;
  nameValue: string;
  setNameValue: (nameValue: string) => void;
  emailValue: string;
  setEmailValue: (nameValue: string) => void;
  textValue: string;
  setTextValue: (nameValue: string) => void;
};

export const NewCommentContext = React.createContext<CommentContextType>({
  formNameError: false,
  setFormNameError: () => {},
  formEmailError: false,
  setFormEmailError: () => {},
  formTextError: false,
  setFormTextError: () => {},
  loadingAddComment: false,
  setLoadingAddComment: () => {},
  nameValue: '',
  setNameValue: () => {},
  emailValue: '',
  setEmailValue: () => {},
  textValue: '',
  setTextValue: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const NewCommetProvider: React.FC<Props> = ({ children }) => {
  const [formNameError, setFormNameError] = useState(false);
  const [formEmailError, setFormEmailError] = useState(false);
  const [formTextError, setFormTextError] = useState(false);
  const [loadingAddComment, setLoadingAddComment] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const value = useMemo(
    () => ({
      formNameError,
      setFormNameError,
      formEmailError,
      setFormEmailError,
      formTextError,
      setFormTextError,
      loadingAddComment,
      setLoadingAddComment,
      nameValue,
      setNameValue,
      emailValue,
      setEmailValue,
      textValue,
      setTextValue,
    }),
    [
      formNameError,
      formEmailError,
      formTextError,
      loadingAddComment,
      nameValue,
      emailValue,
      textValue,
    ],
  );

  return (
    <NewCommentContext.Provider value={value}>
      {children}
    </NewCommentContext.Provider>
  );
};
