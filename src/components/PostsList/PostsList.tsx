import classNames from 'classnames';
import React from 'react';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  posts: Post[],
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
  setIsErrorComments: (v: boolean) => void,
  setIsFormShown: (v: boolean) => void,
  setComments: (post: Comment[]) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setIsErrorComments,
  setIsFormShown,
  setComments,
}) => {
  const handleSelectPost = (post: Post) => {
    if (selectedPost?.id !== post.id) {
      setSelectedPost(post);
      setIsFormShown(false);

      return;
    }

    setIsErrorComments(false);
    setSelectedPost(null);
    setComments([]);
  };

  const getButtonTitle = (id: number) => {
    return selectedPost && selectedPost.id === id
      ? 'Close'
      : 'Open';
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
          {posts.map(post => {
            const { id, title } = post;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">
                  {id}
                </td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames(
                      'button is-link',
                      { 'is-light': selectedPost?.id !== id },
                    )}
                    onClick={() => handleSelectPost(post)}
                  >
                    {getButtonTitle(id)}
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
