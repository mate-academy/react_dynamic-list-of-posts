import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import { deleteComment, getComments } from '../../utils/commentsApi';
import { ErrorMessage } from '../../types/ErrorMessage';
import { Post } from '../../types/Post';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(ErrorMessage.NO_ERROR);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { id, title, body } = selectedPost;

  const loadComments = async (idOfPost: number) => {
    try {
      setIsOpen(false);
      setIsLoading(true);
      setIsError(ErrorMessage.NO_ERROR);
      const commentsFromServer = await getComments(idOfPost);

      setComments(commentsFromServer);
    } catch {
      setIsError(ErrorMessage.COMMENTS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadComments(id);
    }
  }, [id]);

  const handleDeleteComment = async (commId: number) => {
    try {
      setIsError(ErrorMessage.NO_ERROR);
      setComments(comments.filter(comment => comment.id !== commId));

      await deleteComment(commId);
    } catch {
      setIsError(ErrorMessage.COMMENTS);
    }
  };

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
          {isLoading && (<Loader />)}

          {(!isLoading && isError) && (
            <div className="notification is-danger" data-cy="CommentsError">
              {isError}
            </div>
          )}

          {(comments.length === 0 && !isError && !isLoading) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!isLoading && !isError && comments.length > 0) && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                const {
                  id: commId,
                  name,
                  email,
                  body: commBody,
                } = comment;

                return (
                  <article
                    key={commId}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${email}`}
                        data-cy="CommentAuthor"
                      >
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(commId)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {commBody}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {(!isLoading && !isError && !isOpen) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpen && (
          <NewCommentForm
            setComments={setComments}
            comments={comments}
            postId={selectedPost.id}
          />
        )}
      </div>
    </div>
  );
};
