import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[] | null;
  setSideBarOpened: React.Dispatch<React.SetStateAction<boolean>>;
  sideBarOpened: boolean;
  loadComments: (post: Post) => Promise<void>;
  setNewCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSideBarOpened,
  sideBarOpened,
  loadComments,
  setNewCommentForm,
}) => {
  const [id, setId] = useState<number | null>(null);

  const openClick = (post?: Post, postId?: number) => {
    setSideBarOpened(true);
    setNewCommentForm(false);

    if (postId && post) {
      setId(postId);
      loadComments(post);
    } else {
      setSideBarOpened(!sideBarOpened);
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
          {posts && posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                {sideBarOpened && post.id === id ? (
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
                    onClick={() => openClick(post, post.id)}
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
