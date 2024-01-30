import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as commentService from '../services/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [writeComment, setWriteComment] = useState(false);

  function loadComments() {
    setErrorMessage('');
    setLoading(true);
    setWriteComment(false);

    commentService.getComments(id)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setLoading(false));
  }

  useEffect(loadComments, [id]);

  const hasError = !loading && errorMessage;
  const hasNoComments = !loading
    && !errorMessage && selectedPost && !comments.length;
  const shouldRenderComments = !loading
    && !errorMessage && selectedPost && comments.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">

          {loading && (
            <Loader />
          )}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {shouldRenderComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a
                        href="mailto:misha@mate.academy"
                        data-cy="CommentAuthor"
                      >
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
                );
              })}
            </>
          )}

          {!writeComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeComment && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
