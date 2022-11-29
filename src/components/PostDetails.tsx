import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  const getComments = async (postId: number) => {
    setLoading(true);
    setError(false);
    try {
      const loadedComments = await client.get<Comment[]>(`/comments?postId=${postId}`);

      setComments(loadedComments);
    } catch (err) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setIsCommenting(false);
    setComments([]);
    getComments(post.id);
  }, [post]);

  const handleWriteComment = () => {
    setIsCommenting(true);
  };

  const deleteComment = (commentId: number) => {
    setComments((prevComments) => (
      prevComments.filter(comment => comment.id !== commentId)
    ));
    client.delete(`/comments/${commentId}`);
  };

  const addComment = (comment: Comment) => {
    setComments((prevComments) => ([
      ...prevComments,
      comment,
    ]));
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
          {loading && (
            <Loader />
          )}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loading && !error && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

          {comments.map((comment) => (
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

          {!loading && !error && !isCommenting && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommenting && (
          <NewCommentForm
            postId={post.id}
            onAddComment={addComment}
          />
        )}
      </div>
    </div>
  );
};
