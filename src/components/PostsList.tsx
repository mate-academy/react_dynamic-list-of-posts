import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setIsForm: (value: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (value: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setIsForm,
  selectedPost,
  setSelectedPost,
}) => {
  const handleSelectedPost = (post: Post) => {
    if (selectedPost?.id !== post.id) {
      setSelectedPost(post);
      setIsForm(false);
    } else {
      setSelectedPost(null);
    }
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
          {posts.map((el) => (
            <tr data-cy="Post" key={el.id}>
              <td data-cy="PostId">{el.id}</td>

              <td data-cy="PostTitle">{el.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== el.id,
                  })}
                  onClick={() => handleSelectedPost(el)}
                >
                  {selectedPost?.id === el.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
