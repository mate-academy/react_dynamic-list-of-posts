import React, { createContext, SetStateAction, useMemo, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { ErrorTypes } from '../types/types';
import { Comment } from '../types/Comment';

interface Children {
  children: React.ReactNode;
}

type ActiveUser = User | null;

interface ActiveUserContextType {
  activeUser: ActiveUser;
  setActiveUser: React.Dispatch<React.SetStateAction<ActiveUser>>;
}

export const ActiveUserContext = createContext<ActiveUserContextType>({
  activeUser: null,
  setActiveUser: () => {},
});

export const ActiveUserProvider: React.FC<Children> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<ActiveUser>(null);

  const value = useMemo(() => ({ activeUser, setActiveUser }), [activeUser]);

  return (
    <ActiveUserContext.Provider value={value}>
      {children}
    </ActiveUserContext.Provider>
  );
};

interface Loader {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoaderContext = createContext<Loader>({
  isLoading: false,
  setIsLoading: () => {},
});

export const LoaderProvider: React.FC<Children> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const value = useMemo(
    () => ({ isLoading, setIsLoading }),
    [isLoading, setIsLoading],
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};

type PostsType = Post[] | null;

interface Posts {
  posts: PostsType;
  setPosts: React.Dispatch<SetStateAction<PostsType>>;
}

export const PostsContext = createContext<Posts>({
  posts: null,
  setPosts: () => {},
});

export const PostsProvider: React.FC<Children> = ({ children }) => {
  const [posts, setPosts] = useState<PostsType>(null);

  const value = useMemo(() => ({ posts, setPosts }), [posts, setPosts]);

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

type Error = ErrorTypes | null;

interface Errors {
  isError: Error;
  setIsError: React.Dispatch<SetStateAction<Error>>;
}

export const ErrorsContext = createContext<Errors>({
  isError: null,
  setIsError: () => {},
});

export const ErrorsProvider: React.FC<Children> = ({ children }) => {
  const [isError, setIsError] = useState<Error>(null);

  const value = useMemo(() => ({ isError, setIsError }), [isError, setIsError]);

  return (
    <ErrorsContext.Provider value={value}>{children}</ErrorsContext.Provider>
  );
};

type SideBarType = Post | null;

interface IsActivePostType {
  activePost: SideBarType;
  setActivePost: React.Dispatch<SetStateAction<SideBarType>>;
}

export const ActivePostContext = createContext<IsActivePostType>({
  activePost: null,
  setActivePost: () => {},
});

export const ActivePostProvider: React.FC<Children> = ({ children }) => {
  const [activePost, setActivePost] = useState<SideBarType>(null);

  const value = useMemo(
    () => ({ activePost, setActivePost }),
    [activePost, setActivePost],
  );

  return (
    <ActivePostContext.Provider value={value}>
      {children}
    </ActivePostContext.Provider>
  );
};

interface CommentList {
  comments: Comment[];
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
}

export const CommentListContext = createContext<CommentList>({
  comments: [],
  setComments: () => {},
});

export const CommentListProvider: React.FC<Children> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const value = useMemo(
    () => ({ comments, setComments }),
    [comments, setComments],
  );

  return (
    <CommentListContext.Provider value={value}>
      {children}
    </CommentListContext.Provider>
  );
};

interface Form {
  isActiveForm: boolean;
  setIsActiveForm: React.Dispatch<SetStateAction<boolean>>;
}

export const CommentFormContext = createContext<Form>({
  isActiveForm: false,
  setIsActiveForm: () => {},
});

export const CommentFormProvider: React.FC<Children> = ({ children }) => {
  const [isActiveForm, setIsActiveForm] = useState(false);

  const value = useMemo(
    () => ({ isActiveForm, setIsActiveForm }),
    [isActiveForm, setIsActiveForm],
  );

  return (
    <CommentFormContext.Provider value={value}>
      {children}
    </CommentFormContext.Provider>
  );
};
