import React, { useState, useEffect, useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getCommentsByPostId } from '../api/comments.api';
import { Comment } from '../types/Comment';
import { PostsContext } from '../context/postsContext';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createNewComment, setCreateNewComment] = useState(false);
  const { selectedPost } = useContext(PostsContext);

  useEffect(() => {
    setLoading(true);

    getCommentsByPostId(post.id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Cannot load comments.');
      })
      .finally(() => setLoading(false));
  }, [post]);

  function onCommentDelete(commentId: number) {
    setComments(prev => prev.filter(
      comment => comment.id !== commentId,
    ));

    deleteComment(commentId)
      .catch(() => {
        setErrorMessage('Cannot delete a comment.');
      });
  }

  useEffect(() => {
    setCreateNewComment(false);
  }, [selectedPost]);

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
          {loading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {comments.length === 0 && !errorMessage && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {comments.length > 0 && !errorMessage && (
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
                          onClick={() => onCommentDelete(comment.id)}
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

              {!createNewComment && !errorMessage && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setCreateNewComment(true)}
                >
                  Write a comment
                </button>
              )}

              {createNewComment && (
                <NewCommentForm
                  postId={post.id}
                  setErrorMessage={setErrorMessage}
                  addComment={(newComment) => setComments(
                    prev => [...prev, newComment],
                  )}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
