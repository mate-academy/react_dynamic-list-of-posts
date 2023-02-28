import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../../types/Post';
import { deleteComment, getPostComments } from '../../api/posts';
import { Comment } from '../../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentSectionShow, setIsCommentSectionShow] = useState(false);
  const [commentsLoaded, setCommentLoaded] = useState(false);
  const [isDeletionError, setIsDeletionError] = useState(false);
  const isCommentsButtonShow = !isCommentSectionShow
    && !commentsLoadingError
    && !isCommentsLoading;
  const isCommentsLoaded = commentsLoaded && !commentsLoadingError;
  const isLoadingSuccessful = isCommentsLoading && !commentsLoadingError;

  const getCommentsFromServer = async () => {
    setComments([]);
    try {
      setCommentLoaded(false);
      setIsCommentsLoading(true);

      const commentsFromServer = await getPostComments(post.id);

      setComments(commentsFromServer);
      setIsCommentsLoading(false);
      setCommentLoaded(true);
    } catch {
      setCommentsLoadingError(true);
    }
  };

  useEffect(() => {
    if (post) {
      getCommentsFromServer();
    }
  }, [post]);

  useEffect(() => {
    if (isCommentSectionShow) {
      setIsCommentSectionShow(false);
    }
  }, [post?.id]);

  const handleDeleteComment = async (commentId: number) => {
    const commentToDelete = comments.find(comment => comment.id === commentId);

    setComments(prevComments => prevComments
      .filter(comment => comment.id !== commentId));
    try {
      await deleteComment(commentId);
    } catch {
      setIsDeletionError(true);
      if (commentToDelete) {
        setComments(prevComments => (
          [...prevComments, commentToDelete]
        ));
      }
    }
  };

  const handleAddCommentToState = (comment: Comment) => {
    setComments(prevComments => [...prevComments, comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoadingSuccessful && <Loader />}

          {commentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isCommentsLoaded && (
            !comments.length
              ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )
              : (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
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
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => {
                            handleDeleteComment(comment.id);
                          }}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                      {isDeletionError && (
                        <div className="notification is-danger">
                          <button
                            type="button"
                            aria-label="delete-comment-button"
                            className="delete"
                            onClick={() => {
                              setIsDeletionError(false);
                            }}
                          />
                          Can`t delete comment
                        </div>
                      )}
                    </article>
                  ))}
                </>
              ))}
        </div>

        {isCommentsButtonShow && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              setIsCommentSectionShow(prevState => !prevState);
            }}
          >
            Write a comment
          </button>
        )}

        {isCommentSectionShow
            && (
              <NewCommentForm
                selectedPostId={post.id}
                handleAddCommentToState={handleAddCommentToState}
              />
            )}
      </div>

    </div>
  );
};
