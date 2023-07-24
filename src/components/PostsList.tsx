import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  onChange: (post: Post) => void,
};

const emptyPost = {
  id: 0,
  title: '',
  userId: 0,
  body: '',
};

export const PostsList: React.FC<Props> = ({ posts, onChange }) => {
  const [postSelected, setPostSelected] = useState<number>(0);

  const handlePostSelected = (post: Post) => {
    setPostSelected(post.id);
    onChange(post);
  };

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
          {posts.map(post => {
            const { id, title } = post;
            const isPostSelected = postSelected === id;

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
                    className={classNames('button is-link', {
                      'is-light': !isPostSelected,
                    })}
                    onClick={() => handlePostSelected(
                      isPostSelected ? emptyPost : post,
                    )}
                  >
                    {isPostSelected ? 'Close' : 'Open'}
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
