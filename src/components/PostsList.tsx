import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | null;
  targetPost: Post | null;
  isOpen: boolean;
  setTargetPost: (post: Post | null) => void;
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
    if (!targetPost) {
      setTargetPost(post);
      setIsOpen(true);

      return;
    }

    if (targetPost.id === post.id) {
      setTargetPost(null);
      setIsOpen(false);

      return;
    }

    setTargetPost(post);
  };

  const booleanValue = isOpen && targetPost;

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
          {posts?.map(post => {
            const { id, title } = post;

            return (
              <tr key={id} data-cy="Post">
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={
                      (booleanValue && targetPost.id === post.id)
                        ? 'button is-link'
                        : 'button is-link is-light'
                    }
                    onClick={() => hendleClick(post)}
                  >
                    {
                      booleanValue && targetPost.id === post.id
                        ? 'Close' : 'Open'
                    }
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
