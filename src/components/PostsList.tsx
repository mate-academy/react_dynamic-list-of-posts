import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts, selectedPost, setSelectedPost,
}) => (
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
          const isThisPost = selectedPost === post;

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
                    'button is-link',
                    { 'is-light': !isThisPost },
                  )}
                  onClick={() => (
                    isThisPost
                      ? setSelectedPost(null)
                      : setSelectedPost(post)
                  )}
                >
                  {isThisPost ? (
                    'Close'
                  ) : (
                    'Open'
                  )}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
