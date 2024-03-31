import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onSelected?: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelected = () => {},
}) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleButtonClick = (post: Post) => {
    onSelected(selectedPost === post ? null : post);
    setSelectedPost(selectedPost === post ? null : post);
  };

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
          {posts.map(post => {
            const { id, title } = post;
            const isOpened = selectedPost === post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': !isOpened,
                    })}
                    onClick={() => handleButtonClick(post)}
                  >
                    {isOpened ? 'Close' : 'Open'}
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
