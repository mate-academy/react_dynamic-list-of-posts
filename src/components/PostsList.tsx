import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { SelectedPost } from '../types/SelectedPost';

interface Props {
  posts: Post[]
  onSelectPost: (post: Post) => void
  selectedPost: SelectedPost | null
}

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
  selectedPost,
}) => {
  const isActive = (post: Post) => (selectedPost?.id === post.id);

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
                      { 'is-light': !isActive(post) },
                    )}
                    onClick={() => onSelectPost(post)}
                  >
                    {isActive(post)
                      ? 'Close'
                      : 'Open'}
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
