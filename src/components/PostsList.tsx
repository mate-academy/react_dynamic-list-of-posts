import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  userPosts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setIsFormOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectedPost,
  setSelectedPost,
  setIsFormOpened,
}) => {
  function handleButtonClick(post: Post) {
    setIsFormOpened(false);

    if (!selectedPost) {
      setSelectedPost(post);
    } else if (selectedPost !== post) {
      setSelectedPost(post);
    } else {
      setSelectedPost(null);
    }
  }

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
          {userPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title} </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost !== post,
                  })}
                  onClick={() => handleButtonClick(post)}
                >
                  {selectedPost === post ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
