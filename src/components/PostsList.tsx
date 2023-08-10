import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[]
  getComments: (postValue: Post) => void
  openSidebar: boolean
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
  setEnableForm: React.Dispatch<React.SetStateAction<boolean>>
};

export const PostsList: React.FC<Props> = ({
  posts,
  getComments,
  setOpenSidebar,
  openSidebar,
  setEnableForm,
}) => {
  const [sidebarId, setSidebarId] = useState<number>(0);

  const handleButtonClick = (post: Post) => {
    if (openSidebar && post.id === sidebarId) {
      setOpenSidebar(false);
      setSidebarId(0);

      return;
    }

    setEnableForm(false);
    getComments(post);
    setOpenSidebar(true);
    setSidebarId(post.id);
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
          {posts.map(({
            id, title, userId, body,
          }) => {
            const isSidebarOpen = sidebarId === id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link',
                      { 'is-light': !isSidebarOpen })}
                    onClick={() => handleButtonClick({
                      id, title, userId, body,
                    })}
                  >
                    {isSidebarOpen ? 'Close' : 'Open'}
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
