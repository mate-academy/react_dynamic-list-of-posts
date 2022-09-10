import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { TRootDispatch, TRootState } from '../../redux/store';
import { IPost } from '../../types/Post.interface';
import { setCurrentPost } from '../../redux/slices/postSlice';

type TProps = {
  post: IPost;
};

export const Post: React.FC<TProps> = ({ post }) => {
  const { currentPost } = useSelector((state: TRootState) => state.posts);
  const [isCurrent, setIsCurrent] = useState(false);

  const dispatch: TRootDispatch = useDispatch();

  useEffect(() => {
    setIsCurrent(post.id === currentPost?.id);
  }, [currentPost]);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button is-link',
            {
              'is-light': !isCurrent,
            },
          )}
          onClick={() => {
            const current = isCurrent ? null : post;

            dispatch(setCurrentPost(current));
          }}
        >
          {isCurrent ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
