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
  const [sidebarId, setSidebarId] = useState(0);

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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link',
                    { 'is-light': sidebarId !== post.id })}
                  onClick={() => handleButtonClick(post)}
                >
                  {sidebarId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
