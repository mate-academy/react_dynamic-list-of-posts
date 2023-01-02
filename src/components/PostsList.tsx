import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | null;
  targetPost: Post | null;
  isOpen: boolean;
  setTargetPost: (post: Post) => void;
  setIsOpen: (val: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  targetPost,
  isOpen,
  setTargetPost,
  setIsOpen,
}) => {
  const hendleClick = (post: Post) => {
    setTargetPost(post);
    setIsOpen(!isOpen);
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

        {posts && (
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
                    className={
                      (isOpen && targetPost && targetPost.id === post.id)
                        ? 'button is-link'
                        : 'button is-link is-light'
                    }
                    onClick={() => hendleClick(post)}
                  >
                    {targetPost && targetPost.id === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
