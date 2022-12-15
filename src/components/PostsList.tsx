import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  postIdComments: number | null;
  setPostIdComments: (num: number | null) => void;
  fetchComments: (id: number) => Promise<void>;
  setIsCommentsLoading: (val: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  postIdComments,
  setPostIdComments,
  fetchComments,
  setIsCommentsLoading,
}) => {
  const handleOpenComments = async (postId: number) => {
    try {
      if (postIdComments !== postId) {
        setIsCommentsLoading(true);
        setPostIdComments(postId);
        await fetchComments(postId);
        setIsCommentsLoading(false);
      } else {
        setPostIdComments(null);
      }
    } catch (error) {
      throw new Error('trouble with uploading a comments');
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
          {userPosts.map(post => {
            return (
              <tr
                data-cy="Post"
                key={post.id}
              >
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    onClick={() => handleOpenComments(post.id)}
                    className={classNames(
                      'button',
                      'is-link',
                      ({ 'is-light': postIdComments !== post.id }),
                    )}
                  >
                    {postIdComments === post.id ? 'Close' : 'Open'}
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
