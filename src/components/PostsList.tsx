import React, { useRef } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  onSetPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({ posts, onSetPost }) => {
  const selectedPostId = useRef<number | null>(null);

  const handleSelectPost = (post: Post) => {
    if (selectedPostId.current === post.id) {
      onSetPost(null);
      selectedPostId.current = null;
    } else {
      onSetPost(post);
      selectedPostId.current = post.id;
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
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
                    'button is-link',
                    { 'is-light': selectedPostId.current !== post.id },
                  )}
                  onClick={() => handleSelectPost(post)}
                >
                  {selectedPostId.current !== post.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
