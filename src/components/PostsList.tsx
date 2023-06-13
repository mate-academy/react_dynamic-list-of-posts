import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[],
  handleSelectedPost: (postId: number) => void,
  selectedPost: Post | null,
  handleToggleSidebar: (status?: boolean) => void,
  isOpenSidebar: boolean,
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  handleSelectedPost,
  selectedPost,
  handleToggleSidebar,
  isOpenSidebar,
}) => {
  const handlePostButtonClick = (id: number) => {
    if (selectedPost?.id === id) {
      handleToggleSidebar();
    } else {
      handleSelectedPost(id);
      handleToggleSidebar(true);
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
          {userPosts.map(({ id, title }) => {
            const isSelected = selectedPost?.id === id;

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
                      {
                        'is-light': !isSelected,
                      },
                    )}
                    onClick={() => handlePostButtonClick(id)}
                  >
                    {isSelected && isOpenSidebar ? 'Close' : 'Open'}
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
