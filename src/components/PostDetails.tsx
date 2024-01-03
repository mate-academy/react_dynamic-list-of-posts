import { useContext } from 'react';

import { NewCommentForm } from './NewCommentForm/NewCommentForm';
import { StateContext } from '../store';
import { Comments } from './Comments/Comments';
import { Post } from '../libs/types';

export const PostDetails: React.FC = () => {
  const {
    common: { isShowAddCommentForm },
    posts: { selectedPost },
  } = useContext(StateContext);

  const { id, title, body } = selectedPost as Post;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${id}: ${title}`}
        </h2>

        <p data-cy="PostBody">
          {body}
        </p>
      </div>

      <Comments />

      {isShowAddCommentForm && (
        <NewCommentForm postId={id} />
      )}
    </div>
  );
};
