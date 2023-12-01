import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as service from '../utils/api';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  isForm: boolean;
  setIsForm: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isForm,
  setIsForm,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadComment, setIsLoadComment] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  const { body, id, title } = selectedPost;

  useEffect(() => {
    setIsLoadComment(false);

    service.getComments(id)
      .then(setComments)
      .catch(() => setIsLoadError(true))
      .finally(() => setIsLoadComment(false));
  }, [id]);

  const handleCommentAdd = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (commentId: number) => {
    setIsDeleteError(false);

    service.deleteComment(commentId)
      .then(() => {
        setComments(el => el.filter(
          comment => comment.id !== commentId,
        ));
      })
      .catch(() => {
        setIsDeleteError(true);
      });
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
          {isLoadComment && (
            <Loader />
          )}

          {isLoadError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoadComment && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoadComment && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(({
                body: commentBody,
                email,
                id: commentId,
                name,
              }) => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={commentId}
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
                      onClick={() => handleDeleteComment(commentId)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {commentBody}
                  </div>
                </article>
              ))}
            </>
          )}

          {isDeleteError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Unable to add comment, try again.
            </p>
          )}

          {!isForm && !isLoadComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isForm && (
          <NewCommentForm
            handleCommentAdd={handleCommentAdd}
            selectedPost={selectedPost}
          />
        )}
      </div>
    </div>
  );
};
