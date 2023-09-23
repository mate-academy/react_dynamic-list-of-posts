/* eslint-disable */
import React, {
  useContext,
} from 'react';
import { Post } from '../types/Post';
import { StateContext } from './AppContext';
import { ACTIONS } from '../utils/enums';

type Props = {
  usersPosts: Post[],
}

export const PostsList: React.FC<Props> = ({ usersPosts }) => {
  const { dispatch } = useContext(StateContext);
  function openPost(post: Post) {
    dispatch({ type: ACTIONS.SET_SELECTED_POST, payload: post });
    dispatch({ type: ACTIONS.SHOWFORM, payload: false })
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

          {usersPosts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-link is-light"
                  onClick={() => openPost(post)}
                >
                  Open
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
};
