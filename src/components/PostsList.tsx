import React, { useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { posts } from '../utils/fetchPosts';
import { Loader } from './Loader';

type Props = {
  currentUser: User;
  isCommentOpen: boolean;
  setIsCommentOpen: (isCommentOpen: boolean) => void;
  setCurrentPost: (post: Post | null) => void;
  currentPost: Post | null;
  onError: (error: string | null) => void;
};

export const PostsList: React.FC<Props> = ({
  currentUser,
  isCommentOpen,
  setIsCommentOpen,
  setCurrentPost,
  currentPost,
  onError,
}) => {
  const [currentUsersPosts, setCurrentUsersPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    onError(null);
    setError(null);
    posts
      .get<Post[]>(`/posts?userId=${currentUser.id}`)
      .then(data => {
        setCurrentUsersPosts(data);
      })
      .catch(() => {
        setError('Failed to load posts');
        onError('Failed to load posts');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, onError]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        {error}
      </div>
    );
  }

  if (currentUsersPosts.length === 0) {
    return (
      <div className="notification is-warning" data-cy="NoPostsYet">
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {currentUsersPosts.map(userPost => (
            <tr data-cy="Post" key={userPost.id}>
              <td data-cy="PostId">{userPost.id}</td>

              <td data-cy="PostTitle">{userPost.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${
                    currentPost?.id === userPost.id ? '' : 'is-light'
                  }`}
                  onClick={() => {
                    const isCurrentPost = currentPost?.id === userPost.id;

                    if (isCurrentPost && isCommentOpen) {
                      setIsCommentOpen(false);
                      setCurrentPost(null);
                    } else {
                      if (!isCommentOpen) {
                        setIsCommentOpen(true);
                      }

                      setCurrentPost(userPost);
                    }
                  }}
                >
                  {isCommentOpen && currentPost?.id === userPost.id
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
