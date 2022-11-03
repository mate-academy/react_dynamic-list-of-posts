import classNames from 'classnames';
import React, { useContext } from 'react';
import { DispatchContext, ReducerActions, StateContext } from '../AppContext';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { userPosts, selectedPost } = useContext(StateContext);

  const handelSetSelectedPost = (post: Post) => {
    if (selectedPost?.id === post.id) {
      dispatch({
        type: ReducerActions.setSelectedPost,
        payload: null,
      });

      dispatch({
        type: ReducerActions.setIsWriteComment,
        payload: false,
      });
    } else {
      dispatch({
        type: ReducerActions.setSelectedPost,
        payload: post,
      });

      dispatch({
        type: ReducerActions.setIsWriteComment,
        payload: false,
      });
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
          {userPosts && userPosts.map(post => (
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectedPost?.id !== post.id,
                  })}
                  onClick={() => handelSetSelectedPost(post)}
                >
                  {selectedPost?.id === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
