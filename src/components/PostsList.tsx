import React, { useContext } from 'react';
import { PostsContext } from '../store/PostsProvider';
import { getComments } from '../api';
import { Post } from '../types/Post';
import { PostContext } from '../store/PostProvider';
import { CommentsContext } from '../store/CommentsProvider';

export const PostsList: React.FC = () => {
  const { posts } = useContext(PostsContext);
  const { post, setPost } = useContext(PostContext);
  const { setComments, setCommentsStatus } = useContext(CommentsContext);

  const closePost = () => {
    setPost(null);
    setComments([]);
  };

  const openPost = async (currentPost: Post) => {
    setComments([]);
    setCommentsStatus('loading');
    setPost(currentPost);

    try {
      const response = await getComments(currentPost.id);

      if (!response) {
        throw new Error('404');
      }

      setComments(response);
      setCommentsStatus('success');
    } catch {
      setCommentsStatus('error');
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
          {posts.map(item => {
            return (
              <tr key={item.id} data-cy="Post">
                <td data-cy="PostId">{item.id}</td>

                <td data-cy="PostTitle">{item.title}</td>

                <td className="has-text-right is-vcentered">
                  {post?.id !== item.id ? (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link is-light"
                      onClick={() => openPost(item)}
                    >
                      Open
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-cy="PostButton"
                      className="button is-link"
                      onClick={() => closePost()}
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
