import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  onSelectPost: (post: Post | null) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onSelectPost,
}) => {
  const [openPostId, setOpenPostId] = useState(-1);

  const handleSelectPost = useCallback(
    (post: Post) => {
      setOpenPostId(post.id);
      onSelectPost(post);
    }, [],
  );

  const handleDeselectPost = useCallback(() => {
    onSelectPost(null);
    setOpenPostId(-1);
  }, []);

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
          {posts.map((post) => (
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
                    'button',
                    'is-link',
                    {
                      'is-light': openPostId !== post.id,
                    },
                  )}
                  onClick={() => (
                    openPostId === post.id
                      ? handleDeselectPost()
                      : handleSelectPost(post)
                  )}
                >
                  {openPostId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
