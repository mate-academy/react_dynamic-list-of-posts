import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post | null,
  isCommentButtonClicked: boolean,
  setIsCommentButtonClicked: (value: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isCommentButtonClicked,
  setIsCommentButtonClicked,
}) => {
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentErrorMessage, setCommentErrorMessage] = useState('');
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const commentButtonHandler = () => {
    setIsCommentButtonClicked(true);
  };

  const getPostComments = () => {
    return client.get<Comment[]>(`/comments?postId=${selectedPost?.id}`)
      .catch(() => {
        setCommentErrorMessage('Something went wrong!');
      });
  };

  useEffect(() => {
    setIsCommentsLoading(true);
    getPostComments()
      .then(commentsFromServer => {
        if (commentsFromServer) {
          setPostComments(commentsFromServer);
        }
      })
      .finally(() => setIsCommentsLoading(false));
  }, [selectedPost]);

  const deleteComment = (id: number) => {
    return client.delete(`/comments/${id}`);
  };

  const handleDeletingComment = (id: number) => {
    setPostComments(prev => prev.filter(currentComment => (
      currentComment.id !== id
    )));

    deleteComment(id)
      .catch(() => {
        setCommentErrorMessage('delete error');
      });
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
          {isCommentsLoading && (
            <Loader />
          )}

          {commentErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!postComments.length
            && !commentErrorMessage
            && !isCommentsLoading
          ) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(postComments.length > 0
            && !commentErrorMessage
            && !isCommentsLoading
          ) && (
            <p className="title is-4">Comments:</p>
          )}

          {(postComments.length > 0 && !isCommentsLoading
          ) && (
            postComments.map(comment => (
              <>
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeletingComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              </>
            ))
          )}

          {(!isCommentsLoading
            && !commentErrorMessage
            && !isCommentButtonClicked
          ) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={commentButtonHandler}
            >
              Write a comment
            </button>
          )}
        </div>

        {(isCommentButtonClicked && !isCommentsLoading) && (
          <NewCommentForm
            selectedPost={selectedPost}
            setPostsComments={setPostComments}
            setCommentErrorMessage={setCommentErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
