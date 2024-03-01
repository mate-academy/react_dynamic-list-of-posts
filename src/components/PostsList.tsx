import React, { useCallback, useContext } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';
import { Context } from './Store';

interface Props {
  posts: Post[];
  isSelectedPost: Post | null;
  setOpenDetails: (post: Post | null) => void;
}

export const PostsList: React.FC<Props> = React.memo(
  ({ posts, isSelectedPost, setOpenDetails }) => {
    const { getComments, setOpenForm } = useContext(Context);

    const handleSelectedPost = useCallback(
      (post: Post) => {
        if (isSelectedPost === post) {
          setOpenDetails(null);
        } else {
          setOpenDetails(post);
          getComments(post.id);
          setOpenForm(false);
        }
      },
      [getComments, isSelectedPost, setOpenDetails, setOpenForm],
    );

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
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={cn('button is-link', {
                      'is-light': isSelectedPost?.id !== post.id,
                    })}
                    onClick={() => handleSelectedPost(post)}
                  >
                    {isSelectedPost?.id === post.id ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
