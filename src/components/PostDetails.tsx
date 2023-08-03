import React, { useContext, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import {
  CommentsContext,
  ErrorContext,
  PostDataContext,
} from './UserContext/UserContext';

export const PostDetails: React.FC = () => {
  const postDetails = useContext(PostDataContext);
  const { isLoading } = useContext(ErrorContext);
  const { isError } = useContext(ErrorContext);
  const commentsData = useContext(CommentsContext);
  const [click, setClick] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postDetails.postData?.id}: ${postDetails.postData?.title}`}
          </h2>

          <p data-cy="PostBody">
            {postDetails.postData?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {commentsData.comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {commentsData.comments.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a href={comment.email} data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setClick(true)}
          >
            Write a comment
          </button>
        </div>

        {click && <NewCommentForm />}

      </div>
    </div>
  );
};
