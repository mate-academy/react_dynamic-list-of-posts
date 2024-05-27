import { useContext } from 'react';
import { Post } from '../types/Post';
import { DispatchContext, StateContext } from '../utils/Store';
import classNames from 'classnames';

type Props = {
  userPost: Post;
};

export const PostComponent = ({ userPost }: Props) => {
  const state = useContext(StateContext);
  const { selectedPost, isSelectedPost } = state;
  const dispatch = useContext(DispatchContext);

  const hadleSelectedPost = () => {
    if (!selectedPost) {
      dispatch({
        type: 'setSelectedPost',
        payload: userPost,
      });

      dispatch({
        type: 'setIsPostSelected',
        payload: true,
      });
    }

    if (selectedPost) {
      dispatch({
        type: 'updatedSetSelectedPost',
        payload: userPost,
      });
      dispatch({
        type: 'setIsPostSelected',
        payload: true,
      });
    }

    if (selectedPost?.id === userPost.id) {
      dispatch({
        type: 'setSelectedPost',
        payload: null,
      });

      dispatch({
        type: 'setIsPostSelected',
        payload: false,
      });
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{userPost.id}</td>

      <td data-cy="PostTitle">{userPost.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': userPost.id !== selectedPost?.id || !isSelectedPost,
          })}
          onClick={hadleSelectedPost}
        >
          {userPost.id === selectedPost?.id && isSelectedPost
            ? 'Close'
            : 'Open'}
        </button>
      </td>
    </tr>
  );
};
