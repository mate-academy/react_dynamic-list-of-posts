import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type PostlistProps = {
  currentPostsList: Post[],
  setSelectedPostId: (postId: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<PostlistProps> = ({
  currentPostsList,
  setSelectedPostId,
  selectedPostId,
}) => {
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
          {currentPostsList.map((post) => (
            <tr
              data-cy="Post"
              key={post.id}
            >
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
                    { 'is-link': post.id === selectedPostId },
                    { 'is-link is-light': post.id !== selectedPostId },
                  )}
                  onClick={() => {
                    if (post.id === selectedPostId) {
                      setSelectedPostId(0);
                    } else {
                      setSelectedPostId(post.id);
                    }
                  }}
                >
                  {post.id === selectedPostId
                    ? ('Close')
                    : ('Open')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
