import { FC, useContext, memo } from 'react';
import { PostsContext } from '../../../PostsProvider';

export const PostHeader: FC = memo(() => {
  const { selectedPost } = useContext(PostsContext);

  return (
    <div className="block">
      <h2 data-cy="PostTitle">
        {selectedPost
          ? `#${selectedPost.id}: ${selectedPost.title}`
          : ''}
      </h2>

      <p data-cy="PostBody">
        {selectedPost?.body}
      </p>
    </div>
  );
});
