import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | null;
  handlePostInfo: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  handlePostInfo,
}) => {
  const [currentPostId, setCurrentPostId] = useState(0);

  const handleOnClick = (postId: number) => {
    setCurrentPostId(prevState => {
      if (prevState === postId) {
        return 0;
      }

      return postId;
    });
  };

  useEffect(() => {
    handlePostInfo(currentPostId);
  }, [currentPostId]);

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
          {posts && posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': post.id !== currentPostId },
                  )}
                  onClick={() => handleOnClick(post.id)}
                >
                  {(post.id === currentPostId) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
