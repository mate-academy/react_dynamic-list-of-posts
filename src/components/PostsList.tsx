import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
};

export const PostsList: React.FC<Props> = (
  {
    posts,
    selectedPost,
    setSelectedPost,
  },
) => {
  const handlePostSelect = (post: Post) => {
    if (selectedPost && post.id === selectedPost.id) {
      setSelectedPost(null);

      return;
    }

    setSelectedPost(post);
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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  onClick={() => handlePostSelect(post)}
                  className={classNames(
                    'button is-link',
                    {
                      'is-light': post.id !== selectedPost?.id,

                    },
                  )}
                >
                  {post.id !== selectedPost?.id ? ('Open') : ('Close')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
