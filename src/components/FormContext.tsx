import React, { createContext, useState } from 'react';

type FormType = {
  authorField: string;
  setAuthorField: (authorField: string) => void;
  bodyField: string;
  setBodyField: (bodyField: string) => void;
  emailField: string;
  setEmailField: (emailField: string) => void;
  authorError: boolean;
  setAuthorError: (authorError: boolean) => void;
  bodyError: boolean;
  setBodyError: (bodyError: boolean) => void;
  emailError: boolean;
  setEmailError: (emailError: boolean) => void;
  submitLoading: boolean;
  setSubmitLoading: (submitLoading: boolean) => void;
};

export const FormContext = createContext<FormType>({
  authorField: '',
  setAuthorField: () => {},
  bodyField: '',
  setBodyField: () => {},
  emailField: '',
  setEmailField: () => {},
  authorError: false,
  setAuthorError: () => {},
  bodyError: false,
  setBodyError: () => {},
  emailError: false,
  setEmailError: () => {},
  submitLoading: false,
  setSubmitLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FormProvider = ({ children }: Props) => {
  const [authorField, setAuthorField] = useState('');
  const [bodyField, setBodyField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [authorError, setAuthorError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  return (
    <FormContext.Provider
      value={{
        authorField,
        bodyField,
        emailField,
        authorError,
        bodyError,
        emailError,
        submitLoading,
        setAuthorField,
        setBodyField,
        setEmailField,
        setAuthorError,
        setBodyError,
        setEmailError,
        setSubmitLoading,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
