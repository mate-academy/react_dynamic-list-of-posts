import { FC } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { postsActions } from 'store/posts/postsSlice';
import { selectSelectedPost } from 'store/posts/postsSelectors';
import Post from 'models/Post';

type Props = {
  post: Post;
};

const PostItem:FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();

  const selectedPost = useAppSelector(selectSelectedPost);

  const handleSelectedPost = (newPost: Post) => {
    const nextPost = selectedPost?.id === newPost.id ? null : newPost;

    dispatch(postsActions.setSelectedPost(nextPost));
  };

  return (
    <tr key={post.id} data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>
      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button',
            'is-link',
            {
              'is-light': post.id === selectedPost?.id,
            },
          )}
          onClick={() => handleSelectedPost(post)}
        >
          {post.id === selectedPost?.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};

export default PostItem;
