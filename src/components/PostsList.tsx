import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | null;
  setSideBarOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isSideBarOpened: boolean;
  loadComments: (post: Post) => Promise<void>;
  setIsCommentFormOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSideBarOpened,
  isSideBarOpened,
  loadComments,
  setIsCommentFormOpened,
}) => {
  const [currentId, setCurrentId] = useState<number | null>(null);

  const openClick = (post?: Post, postId?: number) => {
    setSideBarOpened(true);
    setIsCommentFormOpened(false);

    if (postId && post) {
      setCurrentId(postId);
      loadComments(post);
    } else {
      setSideBarOpened(!isSideBarOpened);
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
          {posts && posts.map(({
            id,
            userId,
            title,
            body,
          }) => (
            <tr data-cy="Post" key={id}>
              <td data-cy="PostId">{id}</td>

              <td data-cy="PostTitle">
                {title}
              </td>

              <td className="has-text-right is-vcentered">
                {isSideBarOpened && id === currentId ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => openClick()}
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => openClick({
                      id,
                      userId,
                      title,
                      body,
                    }, id)}
                  >
                    Open
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
