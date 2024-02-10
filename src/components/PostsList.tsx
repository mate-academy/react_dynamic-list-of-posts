import React, { useContext } from 'react';
import cn from 'classnames';
import { AppContext } from './AppContext';
import { getComments } from '../api/comments';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const {
    posts, openedPost, setLoadingComments, setSelectedPost, setComments,
    setCommentsErrorMessage, setOpenedPost, selectedPost, setWriteNewComment,
  } = useContext(AppContext);

  const handleGetPostsComments = (post: Post) => {
    if (openedPost) {
      if (selectedPost?.id !== post.id) { // відкрит інший
        setSelectedPost(post);
        setWriteNewComment(false);
      } else { // відкрит
        setSelectedPost(null);
        setOpenedPost(false);
      }
    } else { // закрит
      setSelectedPost(post);
      setOpenedPost(true);
    }

    setLoadingComments(true);
    getComments(post.id)
      .then(comments => setComments(comments))
      .catch(error => {
        /* eslint-disable-next-line */
        console.error("Error fetching posts:", error);
        setCommentsErrorMessage(true);
      })
      .finally(() => {
        setLoadingComments(false);
      });
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
                  className={cn('button is-link',
                    { 'is-light': selectedPost !== post })}
                  onClick={() => {
                    handleGetPostsComments(post);
                  }}
                >
                  {`${openedPost && selectedPost === post ? 'Close' : 'Open'}`}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
