import React, { useContext } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { CommentContext } from './CommentContext';
import { PostContext } from './PostsContext';

export const PostsList: React.FC = () => {
  const { loadComments, showComments, setShowComments } =
    useContext(CommentContext);
  const { posts, setSelectedPost, selectedPost } = useContext(PostContext);
  const handleOpeningComments = (post: Post) => {
    setShowComments(!showComments);
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
      loadComments(post.id);
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
          {posts.map(post => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.body}</td>
                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link', {
                      'is-light': selectedPost?.id !== post.id,
                    })}
                    onClick={() => handleOpeningComments(post)}
                  >
                    {selectedPost?.id === post.id ? 'Close' : 'Open'}
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
