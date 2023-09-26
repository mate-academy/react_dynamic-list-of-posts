import React, {
  useContext, useState,
} from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { StateContext } from './AppContext';
import { ACTIONS } from '../utils/enums';

type Props = {
  usersPosts: Post[],
};

export const PostsList: React.FC<Props> = ({ usersPosts }) => {
  const { state, dispatch } = useContext(StateContext);
  const [close, setClose] = useState(false);

  function openPost(post: Post) {
    setClose(!close);
    dispatch({ type: ACTIONS.SET_SELECTED_POST, payload: post });
    dispatch({ type: ACTIONS.SHOWFORM, payload: false });

    if (close) {
      dispatch({ type: ACTIONS.SET_SELECTED_POST, payload: {} as Post });
    }
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
                  className={classNames('button is-link', {
                    'is-light': (state.selectedPost.id !== post.id),
                  })}
                  onClick={() => openPost(post)}
                >
                  {(state.selectedPost.id !== post.id) ? 'Open' : 'Close'}
                </button>
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};
