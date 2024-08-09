import React, { useEffect, useState } from 'react';
import { useValues } from '../SharedContext';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Notification } from './Notification';
import { Messages } from './constants/Messages';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const {
    comments,
    isLoadingComments,
    isError,
    handleLoadComments,
    handleDeleteComment,
  } = useValues();
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    handleLoadComments(post.id);
    setIsCommenting(false);
  }, [post.id, handleLoadComments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>
        <div className="block">
          {isError && (
            <Notification
              errorMessage={Messages.commentsError}
              dataCy={'CommentsError'}
            />
          )}

          {isLoadingComments ? (
            <Loader />
          ) : !comments.length && !isError ? (
            <Notification
              errorMessage={Messages.noCommentsMessage}
              dataCy={'NoCommentsMessage'}
            />
          ) : (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(({ id, email, name, body }) => (
                <article
                  className="message is-small"
                  key={id}
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(id)}
                    >
                      delete button
                    </button>
                  </div>
                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isCommenting && !isLoadingComments && !isError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommenting(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommenting && !isLoadingComments && !isError && <NewCommentForm />}
      </div>
    </div>
  );
};
