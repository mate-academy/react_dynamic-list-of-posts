import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | undefined,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [commentsIsLoading, setCommentsIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [addCommentFormVisible, setAddCommentFormVisible] = useState(false);

  useEffect(() => {
    setAddCommentFormVisible(false);

    if (selectedPost) {
      setCommentsIsLoading(true);
      setCommentsLoadingError(false);
      getComments(selectedPost.id)
        .then(data => setComments(data))
        .catch(() => setCommentsLoadingError(true))
        .finally(() => setCommentsIsLoading(false));
    }
  }, [selectedPost]);

  const addNewComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const deleteCommentHandler = (commentId:number) => {
    setComments(comments.filter(el => el.id !== commentId));
    deleteComment(commentId)
      .then(() => {})
      .catch(() => {})
      .finally();
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {commentsIsLoading && <Loader />}

          {commentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0
          && !commentsLoadingError
          && !commentsIsLoading
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !commentsIsLoading && (
            <>
              <p className="title is-4">Comments:</p>
              {
                comments.map(comment => {
                  return (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${comment.email}`}
                          data-cy="CommentAuthor"
                        >
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => deleteCommentHandler(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  );
                })
              }
            </>
          )}

          {!addCommentFormVisible
            && !commentsIsLoading
            && !commentsLoadingError
            && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setAddCommentFormVisible(!addCommentFormVisible)}
              >
                Write a comment
              </button>
            )}
        </div>

        {addCommentFormVisible && selectedPost && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            addNewComment={addNewComment}
          />
        )}
      </div>
    </div>
  );
};
