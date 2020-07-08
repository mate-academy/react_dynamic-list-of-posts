/* eslint-disable no-console */
import React from 'react';
import { getUsers, getPosts, getComments } from './api';
import {
  commentsType, postsType, usersType, preparedPostsType, handleLoadingType,
} from './interfaces';

export const ButtonLoading: React.FC<handleLoadingType> = ({ handleSetIsLoading }) => {
  const loadFromServer = async () => {
    handleSetIsLoading('isLoadingNow', []);
    const users: usersType[] = await getUsers();
    const posts: postsType[] = await getPosts();
    const comments: commentsType[] = await getComments();

    const findAuthor = (userId: number) => {
      const person: usersType | undefined = users.find(user => user.id === userId);

      if (person) {
        const address = Object.entries(person.address)
          .slice(0, 4)
          .map(option => option.join(' : '))
          .join(', ');

        return [person.name, person.email, address];
      }

      return [];
    };

    function findComments(id: number) {
      return comments.filter(comment => comment.postId === id);
    }

    const preparedPosts: preparedPostsType[] = posts.map((post) => {
      const [author, email, address] = findAuthor(post.userId);

      return {
        ...post,
        author,
        email,
        address,
        comments: findComments(post.id),
      };
    });

    handleSetIsLoading('completed', preparedPosts);
  };

  return (
    <button className="btn btn-info ml" onClick={loadFromServer} type="button">Load posts</button>
  );
};
