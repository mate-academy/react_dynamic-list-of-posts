/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { deletePost } from '../api/post';

type Props = {
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  setIsErrorSide: (arg: boolean) => void,
  openedPost: Post | null,
  setOpenedPost: (post: Post | null) => void,
  setCommentsList: (postId: number) => void,
  setIsVisibleForm: (isVisible: boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setPosts,
  openedPost,
  setIsErrorSide,
  setOpenedPost,
  setCommentsList,
  setIsVisibleForm,
}) => {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const handleCheckboxChange = (postId: number) => {
    setSelectedPosts((prevSelectedPosts) => {
      if (prevSelectedPosts.includes(postId)) {
        return prevSelectedPosts.filter((id) => id !== postId);
      }

      return [...prevSelectedPosts, postId];
    });
  };

  const handleDeletePost = (postId: number) => {
    deletePost(postId)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch(() => setIsErrorSide(true));
  };

  const handleDeleteMultiplePosts = () => {
    selectedPosts.forEach((postId) => {
      deletePost(postId)
        .then(() => { })
        .catch(() => setIsErrorSide(true));
    });
    setSelectedPosts([]);
    setPosts(posts.filter((post) => !selectedPosts.includes(post.id)));
  };

  return (
    <div data-cy="PostsList">
      <p className="title">
        Posts:
      </p>
      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleCheckboxChange(post.id)}
                  />
                  <span>{post.id}</span>
                </label>
              </td>
              <td>
                {post.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button is-link',
                    { 'is-light': openedPost?.id !== post.id },
                  )}
                  onClick={() => {
                    setOpenedPost(openedPost === post ? null : post);
                    setCommentsList(post.id);
                    setIsVisibleForm(false);
                  }}
                >
                  {openedPost?.id !== post.id
                    ? 'Open' : 'Close'}
                </button>
                <button
                  className="button is-danger is-small"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPosts.length > 0 && (
        <div className="mt-3">
          <button
            className="button is-danger is-small"
            onClick={handleDeleteMultiplePosts}
          >
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
};
