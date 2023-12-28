import React, { useContext } from 'react';
import { CommentBlock } from './CommentBlock';
import { PostsContext } from '../store/PostsContext';

export const PostDetails: React.FC = () => {
  const { selectedPost } = useContext(PostsContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #
            {selectedPost?.id}
            :
            {' '}
            {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <CommentBlock />
      </div>
    </div>
  );
};
