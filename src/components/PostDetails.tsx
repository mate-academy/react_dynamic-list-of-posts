import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from '../components/NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import 'bulma/css/bulma.css';

interface Props {
  post: Post | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);
  const deleteComment = async (comment: Comment) => {
    setIsDeleteError(false);

    try {
      await client.delete(`/comments/${comment.id}`);

      setComments(prev => prev.filter(item => item.id !== comment.id));
    } catch {
      setIsDeleteError(true);
    }
  };

  useEffect(() => {
    if (!post) {
      return;
    }

    setIsCommentsError(false);
    setIsLoadingComments(true);
    setIsCommentFormVisible(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(result => {
        setComments(result);
        setIsLoadingComments(false);
      })
      .catch(() => {
        setIsCommentsError(true);
        setIsLoadingComments(false);
      });
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      {!post && <p data-cy="NoSelectedPost">No post selected</p>}

      {post && (
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>
          <p data-cy="PostBody">{post.body}</p>
          <h3>Comments:</h3>
          {isLoadingComments && <Loader />}
          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong!
            </div>
          )}
          {!isLoadingComments && !isCommentsError && comments.length === 0 && (
            <div
              className="notification is-warning"
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </div>
          )}
          {isDeleteError && (
            <div className="notification is-danger">Something went wrong!</div>
          )}
          {comments.map(comment => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comment.id}
            >
              <div className="message-header">
                <a data-cy="CommentAuthor" href={`mailto:${comment.email}`}>
                  {comment.name}
                </a>

                <button
                  type="button"
                  className="delete"
                  onClick={() => deleteComment(comment)}
                >
                  Delete
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                <p>{comment.body}</p>
              </div>
            </article>
          ))}
          {!isLoadingComments && !isCommentsError && !isCommentFormVisible && (
            <button
              className="button is-link"
              data-cy="WriteCommentButton"
              onClick={() => {
                setIsCommentFormVisible(true);
              }}
            >
              Write a comment
            </button>
          )}
          {isCommentFormVisible && (
            <NewCommentForm
              onCommentAdd={comment => {
                setComments(prev => [...prev, comment]);
              }}
              postId={post.id}
            />
          )}
        </div>
      )}
    </div>
  );
};
