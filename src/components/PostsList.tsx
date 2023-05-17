import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  isPostOpen: boolean,
  onPostSelect: (post: Post) => void,
  onOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostsList: React.FC<Props> = ({
  posts,
  isPostOpen,
  onPostSelect,
  onOpen,
}) => {
  const [openPostId, setOpenPostId] = useState(-1);

  const handleClick = (post: Post) => {
    if (openPostId === post.id) {
      onOpen(false);
      setOpenPostId(-1);
    } else {
      onPostSelect(post);
      onOpen(true);
      setOpenPostId(post.id);
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
              <td data-cy="PostId">
                {post.id}
              </td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button', 'is-link', {
                    'is-light': !(isPostOpen && openPostId === post.id),
                  })}
                  onClick={() => handleClick(post)}
                >
                  {isPostOpen && openPostId === post.id
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
