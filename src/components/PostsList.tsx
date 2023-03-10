import classNames from 'classnames';
import React, { useContext, useEffect, useMemo } from 'react';
import { getPostsUser } from '../api';
import { GlobalContext } from '../reducer';
import { Error } from '../types/Error';
import { Post } from '../types/Post';

export const PostsList: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    if (state.selectedUser) {
      dispatch(
        { type: 'loadData', objectLoad: { type: 'postsUser', active: true } },
      );
      getPostsUser(state.selectedUser.id).then((request: Post[] | Error) => {
        if ('error' in request) {
          dispatch(
            {
              type: 'loadData',
              objectLoad: { type: 'postsUser', active: false },
            },
          );
          dispatch({ type: 'error', error: { ...request, type: 'listPosts' } });
        } else {
          dispatch({ type: 'postsUser', posts: request });
          dispatch(
            {
              type: 'loadData',
              objectLoad:
                { type: 'postsUser', active: false },
            },
          );
        }
      });
    }
  }, [state.selectedUser]);

  const selectPost = (post: Post) => {
    if (state.selectedPost === post) {
      dispatch({ type: 'selectPost', post: null });
      dispatch({ type: 'activeForm', active: false });
    } else {
      dispatch({ type: 'selectPost', post });
      dispatch({ type: 'activeForm', active: false });
    }
  };

  const renderListPosts = useMemo(() => {
    return state.listPostsUser.map((post: Post) => {
      return (
        <tr data-cy="Post" key={post.id}>
          <td data-cy="PostId">{post.id}</td>

          <td data-cy="PostTitle">
            {post.body}
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className={classNames('button is-link', {
                'is-light': state.selectedPost !== post,
              })}
              onClick={() => selectPost(post)}
            >
              { state.selectedPost === post ? 'Close' : 'Open'}
            </button>
          </td>
        </tr>
      );
    });
  }, [state.listPostsUser, state.selectedPost]);

  return (
    state.listPostsUser.length > 0 ? (
      <div data-cy="PostsList">
        <p className="title">Posts:</p>

        <table
          className="table is-fullwidth is-striped is-hoverable is-narrow"
        >
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {renderListPosts}
          </tbody>
        </table>
      </div>
    ) : <></>
  );
};
