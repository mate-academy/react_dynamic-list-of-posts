import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  selectPost: Post | null,
  openerDetails: (post: Post) => void,
  closeCommentList: React.Dispatch<React.SetStateAction<boolean>>,
  isCommentListHiden: boolean,
};

export const PostsList: React.FC<Props> = ({
  posts,
  selectPost,
  openerDetails,
  closeCommentList,
  isCommentListHiden,
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
                {isCommentListHiden && (
                  <button
                    type="button"
                    data-cy="PostButton"
                    className="button is-link is-light"
                    onClick={() => openerDetails(post)}
                  >
                    Open
                  </button>
                )}

                {!isCommentListHiden && (
                  post.id === selectPost?.id
                    ? (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button is-link is-ligth"
                        onClick={() => closeCommentList(true)}
                      >
                        Close
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-cy="PostButton"
                        className="button"
                        onClick={() => openerDetails(post)}
                      >
                        Open
                      </button>
                    )
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
