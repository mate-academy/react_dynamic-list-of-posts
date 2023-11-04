import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Errors } from '../types/Errors';
import { Post } from '../types/Post';
import { apiActions } from '../utils/apiActions';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isForm, setIsForm] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentsError, setIsCommentsError] = useState(Errors.None);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  useEffect(() => {
    setIsCommentsLoading(true);

    apiActions
      .getPostComments(post.id)
      .then((commentsFromServer) => {
        setPostComments(commentsFromServer);
      })
      .catch(() => setIsCommentsError(Errors.Comments))
      .finally(() => setIsCommentsLoading(false));
  }, [post]);

  const isAnyComments = postComments.length > 0;

  const isShow = {
    commentsError: commentsError && !isCommentsLoading,
    noCommentsYet: !isAnyComments && !commentsError && !isCommentsLoading,
    comments: isAnyComments && !commentsError && !isCommentsLoading,
    writeCommentButton: !isForm && !commentsError && !isCommentsLoading,
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isShow.commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError}
            </div>
          )}

          {isShow.noCommentsYet && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isShow.comments && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map((comment) => {
                const handleCommentDeleteClick = () => {
                  const prevComments = [...postComments];
                  const newComments = prevComments.filter(
                    (c) => c.id !== comment.id,
                  );

                  setPostComments(() => newComments);

                  apiActions.deleteComment(comment.id).catch(() => {
                    setPostComments(() => prevComments);
                  });
                };

                return (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        onClick={handleCommentDeleteClick}
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
          {isShow.writeCommentButton && (
            <button
              onClick={() => setIsForm(true)}
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
            >
              Write a comment
            </button>
          )}
        </div>
        {isForm && <NewCommentForm onComments={setPostComments} id={post.id} />}
      </div>
    </div>
  );
};
