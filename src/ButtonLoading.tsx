/* eslint-disable no-console */
import React from 'react';
import {
  fetchData, URLComments, URLPosts, URLUsers,
} from './api';
import {
  Comment, PostFromServer, User, Post,
} from './interfaces';

type Props = {
  handleSetIsLoading: (state: string, list: Post[]) => (void);
};

export const ButtonLoading: React.FC<Props> = ({ handleSetIsLoading }) => {
  const loadFromServer = async () => {
    handleSetIsLoading('isLoadingNow', []);
    const users = await fetchData<User>(URLUsers);
    const posts = await fetchData<PostFromServer >(URLPosts);
    const comments = await fetchData<Comment>(URLComments);

    const findAuthor = (userId: number) => {
      const person: User | undefined = users.find(user => user.id === userId);

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

    const preparedPosts: Post[] = posts.map((post) => {
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
