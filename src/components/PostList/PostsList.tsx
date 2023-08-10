import React from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  openPost: (post: Post | null) => void;
  setIsNewCommentFormActive: (value: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  openPost,
  setIsNewCommentFormActive,
}) => {
  const hadleOpenPost = (isCurrentPostSelected: boolean, currentPost: Post) => {
    openPost(isCurrentPostSelected
      ? null : currentPost);

    setIsNewCommentFormActive(false);
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
            const isThisPostSelected = selectedPost === post;

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
                      'is-light': !isThisPostSelected,
                    })}
                    onClick={() => hadleOpenPost(isThisPostSelected, post)}
                  >
                    {isThisPostSelected ? 'Close' : 'Open'}
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
