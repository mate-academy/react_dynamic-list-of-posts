import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsService from '../services/comments';
import { Post } from '../types/Post';

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

type Props = {
  selectedPostId: number | null;
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
  selectedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [errorMessageComments, setErrorMessageComments] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const loadComments = async () => {
    if (!selectedPostId) {
      return;
    }

    setIsCommentsLoading(true);
    setComments([]);

    try {
      const loadedComments = await commentsService.getComments(selectedPostId);

      setComments(loadedComments);
    } catch {
      setErrorMessageComments(true);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [selectedPostId]);

  function deleteComment(commentId: number) {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    return commentsService.deleteComment(commentId);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        {/* {errorMessageCommentForm && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )} */}

        {!errorMessageComments ? (
          <div className="block">
            {isCommentsLoading ? (
              <Loader />
            ) : comments.length === 0 ? (
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
                        onClick={() => deleteComment(comment.id)}
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
            {isFormVisible && (
              <NewCommentForm
                setErrorMessageComments={setErrorMessageComments}
                post={selectedPost}
                comments={comments}
                setComments={setComments}
              />
            )}

            {!isCommentsLoading && !isFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}
          </div>
        ) : (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}
      </div>
    </div>
  );
};
