import React, { useContext, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { SidebarContext } from './SidebarContext';
import { CurrentPostContext } from './CurrentPostContext';
import { NotificationContent } from './NotificationManager';
import * as postsApiServise from '../api/PostApi';

type UserPostsType = {
  userPosts: Post[];
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  postLoader: boolean;
  setPostLoader: React.Dispatch<React.SetStateAction<boolean>>;
  onUserPostList: (userId: User['id']) => void;
};

export const UserPostsContext = React.createContext<UserPostsType>({
  userPosts: [],
  setUserPosts: () => {},
  postLoader: false,
  setPostLoader: () => {},
  onUserPostList: () => {},
});

type UserPostsProviderProps = {
  children: React.ReactNode;
};

export const UserPostsProvider: React.FC<UserPostsProviderProps> = ({
  children,
}) => {
  const { setSelectedPost } = useContext(CurrentPostContext);
  const { setSidebar } = useContext(SidebarContext);
  const { notificationDispatch } = useContext(NotificationContent);

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [postLoader, setPostLoader] = useState(false);

  const onUserPostList = async (userId: User['id']) => {
    setUserPosts([]);
    setSelectedPost(null);
    setSidebar(false);

    notificationDispatch({
      type: 'SET_CLEAR',
      source: 'Userloading',
    });

    try {
      setPostLoader(true);
      const listOfPosts = await postsApiServise.getPosts(userId);

      if (listOfPosts.length === 0) {
        notificationDispatch({
          type: 'SET_ALARM',
          error: '',
          alarm: 'No posts yet',
          source: 'Userloading',
        });
      }

      setUserPosts(listOfPosts);
      setPostLoader(false);
    } catch {
      setPostLoader(false);
      notificationDispatch({
        type: 'SET_ERROR',
        error: 'Something went wrong',
        alarm: '',
        source: 'Userloading',
      });
    }
  };

  return (
    <UserPostsContext.Provider
      value={{
        userPosts,
        setUserPosts,
        postLoader,
        setPostLoader,
        onUserPostList,
      }}
    >
      {children}
    </UserPostsContext.Provider>
  );
};
