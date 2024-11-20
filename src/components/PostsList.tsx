import React from 'react';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  handleShowComment: (post: Post) => void;
  showSideBar: number | null;
  setShowSideBar: (id: number | null) => void;
  setShowCommentForm: (item: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  handleShowComment,
  showSideBar,
  setShowSideBar,
  setShowCommentForm,
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
          {userPosts.map((post: Post) => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                {showSideBar !== post.id ? (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => {
                      handleShowComment(post);
                    }}
                  >
                    Open
                  </button>
                ) : (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link"
                    onClick={() => {
                      setShowSideBar(null);
                      setShowCommentForm(false);
                    }}
                  >
                    Close
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
