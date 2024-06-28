import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import classNames from 'classnames';
import { Post } from '../types/Post';
export const PostsList: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { userPosts, selectedPost } = state;
  const { post: targetPost } = selectedPost;
  const handlePostSelection = (post: Post) => {
    if (targetPost?.id === post.id) {
      dispatch({ type: 'SET_SELECTED_POST', payload: null });
      dispatch({ type: 'WRITING_COMMENT_STATUS', payload: false });
    } else {
      dispatch({ type: 'WRITING_COMMENT_STATUS', payload: false });
      dispatch({ type: 'OPEN_SIDEBAR', payload: true });
      dispatch({ type: 'SET_SELECTED_POST', payload: post });
    }
  };

  const handlePostStyle = (post: Post) => {
    return targetPost?.id !== post.id;
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
          {userPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': handlePostStyle(post),
                  })}
                  onClick={() => handlePostSelection(post)}
                >
                  {handlePostStyle(post) ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
