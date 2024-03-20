import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getComments } from '../api/api';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessageComment, setErrorMessageComment] = useState('');

  const [addComment, setAddComment] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setErrorMessageComment('');

    if (selectedPost) {
      setloading(true);

      getComments(selectedPost.id)
        .then(data => {
          setComments(data);
        })
        .catch(() => {
          setErrorMessageComment('Something went wrong');
        })
        .finally(() => {
          setloading(false);
        });
    }
  }, [selectedPost]);

  const delCommentFromState = (commentId: number) => {
    const currentComments = [...comments].filter(comment => {
      return comment.id !== commentId;
    });

    setComments(currentComments);
  };

  useEffect(() => {
    setAddComment(false);
  }, [selectedPost]);

  const handlerDeleteComment = (commentId: number) => {
    delCommentFromState(commentId);

    deleteComment(commentId)
      .then()
      .catch(() => {});
  };

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPost && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost?.id}: ${selectedPost?.title}`}
            </h2>

            <p data-cy="PostBody">{selectedPost?.body}</p>
          </div>

          <div className="block">
            {loading && <Loader />}

            {errorMessageComment && !loading && (
              <div className="notification is-danger" data-cy="CommentsError">
                {errorMessageComment}
              </div>
            )}

            {!errorMessageComment && !loading && (
              <>
                {comments.length === 0 ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>
                    {comments.map(comment => (
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
                            onClick={() => {
                              handlerDeleteComment(comment.id);
                            }}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {comment.body}
                        </div>
                      </article>
                    ))}
                  </>
                )}

                {!addComment && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setAddComment(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </div>

          {addComment && (
            <NewCommentForm
              comments={comments}
              setComments={setComments}
              setAddComment={setAddComment}
              selectedPost={selectedPost}
              setErrorMessageComment={setErrorMessageComment}
            />
          )}
        </div>
      )}
    </div>
  );
};
