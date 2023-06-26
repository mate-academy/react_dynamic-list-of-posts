import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPost: Post | null;
  isCommentsListtHidden: boolean;
  openDetails: (post: Post) => void;
  closeCommentList: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  posts,
  openDetails,
  selectedPost,
  closeCommentList,
  isCommentsListtHidden,
}) => {
  if (!posts.length) {
    return (
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
        No posts yet
      </div>
    );
  }

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
                {isCommentsListtHidden && (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => openDetails(post)}
                  >
                    Open
                  </button>
                )}

                {!isCommentsListtHidden && (
                  post.id === selectedPost?.id
                    ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => closeCommentList(true)}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-light"
                        onClick={() => openDetails(post)}
                      >
                        Open
                      </button>
                    ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
