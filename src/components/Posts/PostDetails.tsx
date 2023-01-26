import { FC } from 'react';
import { NewCommentForm } from '../Comments/NewCommentForm';
import { CommentsList } from '../Comments/CommentsList';

export const PostDetails: FC = () => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #18: voluptate et itaque vero tempora molestiae
          </h2>

          <p data-cy="PostBody">
            eveniet quo quis laborum totam consequatur non dolor ut et est
            repudiandae est voluptatem vel debitis et magnam
          </p>
        </div>

        <div className="block">
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          <CommentsList />

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        </div>

        <NewCommentForm />
      </div>
    </div>
  );
};
