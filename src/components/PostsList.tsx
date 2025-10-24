import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  selectedUserPosts: Post[] | null;
  setOpenSideBar: Dispatch<SetStateAction<boolean>>;
  setSelectedPostId: Dispatch<SetStateAction<number | null>>;
  selectedPostId: number | null;
  openSideBar: boolean;
  setFormOpened: Dispatch<SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  selectedUserPosts,
  setOpenSideBar,
  openSideBar,
  setSelectedPostId,
  selectedPostId,
  setFormOpened,
}) => {
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
          {selectedUserPosts?.map(post => {
            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': post.id !== selectedPostId,
                    })}
                    onClick={event => {
                      event.preventDefault();
                      if (selectedPostId === post.id) {
                        setOpenSideBar(!openSideBar);
                        setSelectedPostId(null);
                      } else {
                        setOpenSideBar(true);
                        setSelectedPostId(post.id);
                        setFormOpened(false);
                      }
                    }}
                  >
                    {post.id === selectedPostId && openSideBar
                      ? 'Close'
                      : 'Open'}
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
