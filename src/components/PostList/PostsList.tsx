import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

interface Props {
  posts: Post[];
  selectedPost: Post | undefined;
  setSelectedPost: (value: Post | undefined) => void;
  setIsWritingComment: (value: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setIsWritingComment,
}) => {
  const handleButtonClick = (post: Post) => {
    if (!selectedPost) {
      setSelectedPost(post);

      return;
    }

    if (post && selectedPost.id !== post.id) {
      setSelectedPost(post);
      setIsWritingComment(false);

      return;
    }

    setSelectedPost(undefined);
    setIsWritingComment(false);
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
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button', 'is-link', {
                      'is-light': !selectedPost || selectedPost.id !== post.id,
                    })}
                    onClick={() => handleButtonClick(post)}
                  >
                    {!selectedPost || selectedPost.id !== post.id
                      ? 'Open'
                      : 'Close'}
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
