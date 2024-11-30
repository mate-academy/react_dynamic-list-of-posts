import React from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

type Props = {
  posts: Post[];
  currPost: Post | null;
  setOpenModal: (value: boolean) => void;
  setCurrPost: (postId: Post | null) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  currPost,
  setOpenModal,
  setCurrPost,
}) => {
  const onOpenPost = (post: Post) => {
    const isSamePost = currPost && currPost?.id === post.id;

    if (isSamePost) {
      setCurrPost(null);
    } else {
      setCurrPost(post);
      setOpenModal(false);
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  onClick={() => onOpenPost(post)}
                  className={cn('button is-link', {
                    'is-light': currPost?.id !== post.id,
                  })}
                >
                  {currPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
