import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Loader } from './Loader';

import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Error } from '../types/Error';

type Props = {
  selectedUser: User,
  posts: Post[],
  isPostsLoading: boolean,
  onSetPosts: (posts: Post[]) => void,
  onLoadPosts: (isLoad: boolean) => void,
  onSelectPost: React.Dispatch<React.SetStateAction<Post | null>>;
  selectedPost: Post | null,
  onError: (error: (prevError: Error) => Error) => void,
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  posts,
  isPostsLoading,
  selectedPost,
  onSetPosts,
  onLoadPosts,
  onSelectPost,
  onError,
}) => {
  useEffect(() => {
    onLoadPosts(false);

    client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
      .then(onSetPosts)
      .catch(() => {
        onError((error) => ({
          ...error,
          posts: true,
        }));
      })
      .finally(() => onLoadPosts(true));
  }, [selectedUser.id]);

  const handleSelectPost = (post: Post) => {
    onSelectPost((current) => (
      current?.id === post.id ? null : post
    ));
  };

  if (!isPostsLoading) {
    return <Loader />;
  }

  if (!posts.length && isPostsLoading) {
    return null;
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => {
            const { id, title } = post;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': selectedPost?.id !== id,
                    })}
                    onClick={() => handleSelectPost(post)}
                  >
                    {selectedPost?.id === id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
