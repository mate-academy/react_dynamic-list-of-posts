import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  usersPosts: Post[],
  setSelectedPost: (value: Post | null) => void,
  selectedPost: Post | null,
  setIsCommentButtonClicked: (value: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  usersPosts,
  setSelectedPost,
  selectedPost,
  setIsCommentButtonClicked,
}) => {
  const selectPostHandler = (post: Post) => {
    if (selectedPost !== post) {
      setSelectedPost(post);
      setIsCommentButtonClicked(false);
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {usersPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost !== post,
                  })}
                  onClick={() => selectPostHandler(post)}
                >
                  {selectedPost !== post
                    ? 'Open'
                    : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
