/* eslint-disable no-console */
import React from 'react';
import {
  fetchData, URLComments, URLPosts, URLUsers,
} from './api';
import {
  CommentsInterface, PostsInterface, UsersInterface, PreparedPostsInterface,
} from './interfaces';

type Props = {
  handleSetIsLoading: (state: string, list: PreparedPostsInterface[]) => (void);
};

export const ButtonLoading: React.FC<Props> = ({ handleSetIsLoading }) => {
  const loadFromServer = async () => {
    handleSetIsLoading('isLoadingNow', []);
    const users = await fetchData<UsersInterface>(URLUsers);
    const posts = await fetchData<PostsInterface>(URLPosts);
    const comments = await fetchData<CommentsInterface>(URLComments);

    const findAuthor = (userId: number) => {
      const person: UsersInterface | undefined = users.find(user => user.id === userId);

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

    const preparedPosts: PreparedPostsInterface[] = posts.map((post) => {
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
