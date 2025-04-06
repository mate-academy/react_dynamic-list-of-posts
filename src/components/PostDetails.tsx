import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import * as commentServices from '../api/comments';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setLoader(true);
    setError('');
    setShowForm(false);
    commentServices
      .getUserComments(post.id)
      .then(setComments)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoader(false));
  }, [post]);

  const handleDeleteComment = (id: number) => {
    commentServices.deleteComment(id).then(() => {
      setComments(current => current.filter(comment => comment.id !== id));
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {loader && <Loader />}
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!loader && !error && (
            <>
              {comments.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {comments.length > 0 && (
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
                          onClick={() => handleDeleteComment(comment.id)}
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
              {!showForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setShowForm(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {showForm && (
          <NewCommentForm postId={post.id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
