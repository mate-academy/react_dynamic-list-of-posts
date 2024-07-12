import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../services/comment';

type PostDetailsProps = {
  postDetails: Post;
};
export const PostDetails: React.FC<PostDetailsProps> = ({ postDetails }) => {
  const { id, title, body } = postDetails;
  const [loading, setLoading] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [commentsError, setCommentsError] = useState('');
  const [isShownCommentForm, setIsShownCommentForm] = useState(false);

  const loadPostComments = (postId: number) => {
    setLoading(true);

    getPostComments(postId)
      .then(comments => {
        if (!comments.length) {
          setPostComments([]);
        }

        setPostComments(comments);
      })
      .catch(() => setCommentsError('Something went wrong'))
      .finally(() => setLoading(false));
  };

  const deletePostComment = (commentId: number) => {
    deleteComment(commentId);
  };

  useEffect(() => {
    loadPostComments(id);
    if (isShownCommentForm) {
      setIsShownCommentForm(false);
    }
  }, [id]);

  const handleCreateComment = () => {
    setIsShownCommentForm(true);
  };

  const handleAddNewComment = (newComment: Comment) => {
    setPostComments(prevComments => [...prevComments, newComment]);
  };

  const handleDeleteComment = (commentId: number) => {
    setPostComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    deletePostComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError}
            </div>
          )}

          {!loading && !postComments.length && !commentsError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && postComments.length && (
            <>
              <p className="title is-4">Comments:</p>
              {postComments.map(comment => {
                // eslint-disable-next-line
                const { id, name, email, body } = comment;

                return (
                  <article
                    key={id}
                    className="message is-small"
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
                );
              })}
            </>
          )}
          {!isShownCommentForm && !loading && !commentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleCreateComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isShownCommentForm && (
          <NewCommentForm postId={id} onAddNewComment={handleAddNewComment} />
        )}
      </div>
    </div>
  );
};
