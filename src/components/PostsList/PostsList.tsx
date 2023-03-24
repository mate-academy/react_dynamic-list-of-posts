import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Post } from '../../types/Post';

type Props = {
  posts: Post[];
  handlePostInfo: (postId: number) => void;
};

export const PostsList: React.FC<Props> = ({ posts, handlePostInfo }) => {
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
          {posts && (
            posts.map(post => {
              const { id, title } = post;

              return (
                <tr data-cy="Post" key={id}>
                  <td data-cy="PostId">{id}</td>

                  <td data-cy="PostTitle">
                    {title}
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      data-cy="PostButton"
                      className={classNames(
                        'button',
                        'is-link',
                        { 'is-light': id !== currentPostId },
                      )}
                      onClick={() => handleOnClick(id)}
                    >
                      {(currentPostId === id) ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
