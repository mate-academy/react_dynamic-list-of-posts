import React, { useContext } from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';
import { DispatchContext, StateContext } from '../utils/GlobalStateProvider';

type Props = {
  posts: Post[] | null;
};

export const PostsList: React.FC<Props> = ({ posts }) => {
  // const [isPostSelected, setIsPostSelected] = useState(false);
  const dispatch = useContext(DispatchContext);
  const { selectedPost, isPostSelected } = useContext(StateContext);

  const handleSelectingPost = (post: Post) => {
    if (post === selectedPost) {
      dispatch({ type: 'setIsPostSelected', payload: false });
      dispatch({ type: 'setSelectedPost', payload: null });

      return;
    }

    dispatch({ type: 'setIsPostSelected', payload: true });
    dispatch({ type: 'setSelectedPost', payload: post });
    dispatch({ type: 'setIsFormEnabled', payload: false });
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
          {posts?.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': post.id !== selectedPost?.id || !isPostSelected,
                  })}
                  onClick={() => handleSelectingPost(post)}
                >
                  {post.id === selectedPost?.id && isPostSelected
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
