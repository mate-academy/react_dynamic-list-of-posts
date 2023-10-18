import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { apiActions } from '../utils/apiAction';
import { User } from '../types/User';
import { ErrorNotification } from '../types/ErrorNotification';
import { Loader } from './Loader';

type Props = {
  setPosts: (posts: Post[]) => void;
  userSelected: User;
  setErrorNotification: (error: (prevError: ErrorNotification)
  => ErrorNotification) => void;
  posts: Post[];
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  selectedPost: Post | null;
  isPostsLoading: boolean;
  setIsPostsLoading: (postL: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  setPosts,
  userSelected,
  setErrorNotification,
  posts,
  setSelectedPost,
  selectedPost,
  isPostsLoading,
  setIsPostsLoading,
}) => {
  useEffect(() => {
    setIsPostsLoading(false);

    apiActions.getUserPosts(userSelected.id)
      .then(setPosts)
      .catch(() => {
        setErrorNotification((errorNotification) => ({
          ...errorNotification,
          posts: true,
        }));
      })
      .finally(() => setIsPostsLoading(true));
  }, [userSelected.id, setErrorNotification, setIsPostsLoading, setPosts]);

  const handleSelectPost = (post: Post) => {
    setSelectedPost((current) => (
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
          {posts.map(post => (
            <tr data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button is-link',
                    { 'is-light': selectedPost?.id !== post.id },
                  )}
                  onClick={() => handleSelectPost(post)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
