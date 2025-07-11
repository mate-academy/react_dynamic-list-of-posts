import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import * as service from '../services/services';
import { Loader } from './Loader';
import classNames from 'classnames';

type Props = {
  user: number;
  setLoading: (value: boolean) => void;
  errorMsg: string;
  setErrorMsg: (message: string) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  user,
  setLoading,
  errorMsg,
  setErrorMsg,
  selectedPost,
  setSelectedPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setLocalLoading(true);

    service
      .getUserPosts(user)
      .then(setPosts)
      .catch(() => setErrorMsg('Something went wrong!'))
      .finally(() => {
        setLoading(false);
        setLocalLoading(false);
      });
  }, [user]);

  if (localLoading) {
    return <Loader />;
  }

  if (user && !localLoading && posts.length === 0 && !errorMsg) {
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => {
                    if (selectedPost?.id === post.id) {
                      setSelectedPost(null);
                    } else {
                      setSelectedPost(post);
                    }
                  }}
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
