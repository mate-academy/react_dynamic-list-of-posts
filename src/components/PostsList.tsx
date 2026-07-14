import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  activePostId: number | null;
  setActivePostId: Dispatch<SetStateAction<number | null>>;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  isSidebarOpen,
  setIsSidebarOpen,
  activePostId,
  setActivePostId,
  setIsFormOpen,
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
          {posts.map(post => {
            const isCurrentPostOpen = isSidebarOpen && activePostId === post.id;

            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={
                      !isCurrentPostOpen
                        ? 'button is-link is-light'
                        : 'button is-link'
                    }
                    onClick={() => {
                      if (isCurrentPostOpen) {
                        setIsSidebarOpen(false);
                        setActivePostId(null);
                      } else {
                        setActivePostId(post.id);
                        setIsFormOpen(false);
                        setIsSidebarOpen(true);
                      }
                    }}
                  >
                    {!isCurrentPostOpen ? 'Open' : 'Close'}
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
