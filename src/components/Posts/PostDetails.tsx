import { FC } from 'react';
import { CommentsList } from '../Comments/CommentsList';
import { usePostStore } from '../../store/postStore';
import { usePost } from '../../hooks/usePost';
import { Loader } from '../Loader';

export const PostDetails: FC = () => {
  const selectedPost = usePostStore((state) => state.selectedPost);
  const { data: post, isLoading, isError } = usePost(selectedPost?.id || 0);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          <CommentsList />
        </div>
      </div>
    </div>
  );
};
