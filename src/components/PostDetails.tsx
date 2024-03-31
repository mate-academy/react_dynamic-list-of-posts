import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { createComment, deleteComment, getComments } from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isNoComments, setIsNoComments] = useState(false);
  const [error, setError] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setIsNoComments(false);
    setShowNewCommentForm(false);

    getComments(post.id)
      .then(fetchedComments => {
        setComments(fetchedComments);

        if (!fetchedComments.length) {
          setIsNoComments(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [post.id]);

  const addComment = async (
    newAuthorName: string,
    newEmail: string,
    newBody: string,
    postId: number,
  ) => {
    setError(false);

    return createComment({
      postId: postId,
      name: newAuthorName,
      email: newEmail,
      body: newBody,
    })
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch(() => setError(true));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id != commentId));
    deleteComment(commentId);
  };

  const handleShowNewCommentForm = () => {
    setShowNewCommentForm(true);
  };

  useEffect(() => {
    if (!comments.length) {
      setIsNoComments(true);
    } else {
      setIsNoComments(false);
    }
  }, [comments.length]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="block">
            {error ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            ) : (
              <>
                {isNoComments ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <p className="title is-4">Comments:</p>
                )}

                {comments.map(comment => {
                  const { email, name, body, id } = comment;

                  return (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={id}
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

                {!showNewCommentForm && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={handleShowNewCommentForm}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {showNewCommentForm && !error && (
          <NewCommentForm addComment={addComment} postId={post.id} />
        )}
      </div>
    </div>
  );
};
