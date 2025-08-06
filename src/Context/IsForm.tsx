import React, { createContext, useState } from 'react';

type IsFormType = {
  commentForm: boolean;
  setCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsFormContext = createContext<IsFormType>({
  commentForm: false,
  setCommentForm: () => {},
});

export const IsFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [commentForm, setCommentForm] = useState<boolean>(false);

  return (
    <IsFormContext.Provider value={{ commentForm, setCommentForm }}>
      {children}
    </IsFormContext.Provider>
  );
};
