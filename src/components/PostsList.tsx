/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Post } from '../types/Post';
import { getPost } from '../api/posts';
import { Error } from '../types/Error';

type Props = {
  posts: Post[];
  setCommentErrorMessage: (error: Error | '') => void;
  isSidebarVisible: boolean;
  setIsSidebarVisible: (visible: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  setLoadingComments: (loading: boolean) => void;
  setIsNewCommentFormVisible: (visible: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setCommentErrorMessage,
  isSidebarVisible,
  setIsSidebarVisible,
  selectedPost,
  setSelectedPost,
  setLoadingComments,
  setIsNewCommentFormVisible,
}) => {
  const handleSelectPost = (currentPost: Post | null) => {
    setCommentErrorMessage('');
    setLoadingComments(true);
    setIsNewCommentFormVisible(false);
    setIsSidebarVisible(true);
    setSelectedPost(currentPost);

    if (currentPost) {
      getPost(currentPost)
        .catch(() => setCommentErrorMessage(Error.LoadingError))
        .finally(() => setLoadingComments(false));
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post: Post) => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  {(!isSidebarVisible && selectedPost === null) ||
                  selectedPost?.id !== post.id ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => {
                        handleSelectPost(post);
                        setIsSidebarVisible(true);
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
                        setSelectedPost(null);
                        setIsSidebarVisible(false);
                      }}
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
