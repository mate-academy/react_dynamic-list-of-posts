import React from 'react';
import { User } from '../types/User';
import { getPostsById } from '../api/posts';
import { Post } from '../types/Post';

type Props = {
  user: User;
  setHasErrorGetPosts: (flag: boolean) => void;
  setIsLoadingPosts: (flag: boolean) => void;
  setPosts: (posts: Post[] | null) => void;
  setHasClicked: (flag: boolean) => void;
  setSelectedUser: (userName: string) => void;
  setHasUser: (hasUser: boolean) => void;
  prevUserId: React.MutableRefObject<number | null>;
};

export const Person: React.FC<Props> = ({
  user,
  setHasErrorGetPosts,
  setIsLoadingPosts,
  setPosts,
  setHasClicked,
  setSelectedUser,
  prevUserId,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setHasClicked(false);

    const prevRef = prevUserId;

    if (prevUserId.current === user.id) {
      return;
    }

    prevRef.current = user.id;

    setSelectedUser(user.name);
    setIsLoadingPosts(true);
    setPosts(null);
    setHasErrorGetPosts(false);

    getPostsById(user)
      .then(posts => {
        setPosts(posts);
      })
      .catch(() => {
        setHasErrorGetPosts(true);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  };

  return (
    <a
      href={`#user-${user.id}`}
      className="dropdown-item"
      onClick={handleClick}
    >
      {user.name}
    </a>
  );
};
