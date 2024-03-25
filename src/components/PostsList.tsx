import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  selectedPost: Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  selectedPost,
}) => {
  const handlePostButtonClick = (post: Post) => {
    setSelectedPost(prev => {
      if (prev?.id === post.id) {
        return null;
      }

      return post;
    });
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
            const selected = selectedPost?.id !== id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">{title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', { 'is-light': selected })}
                    onClick={() => handlePostButtonClick(post)}
                  >
                    {selected ? 'Open' : 'Close'}
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
