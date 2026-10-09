import React from 'react';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import type { Comment, CommentData } from '../types/Comment';

type PostDetailsProps = {
  post: Post;
};

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [addError, setAddError] = useState(false);

  useEffect(() => {
    if (post.id) {
      setIsCommentsLoading(true);
      setIsCommentsError(false);
      setAddError(false);
      setDeleteError(false);
      setIsFormVisible(false);
      setComments([]);
      client
        .get<Comment[]>(`/comments?postId=${post.id}`)
        .then(data => {
          setComments(data);
        })
        .catch(() => {
          setIsCommentsError(true);
        })
        .finally(() => {
          setIsCommentsLoading(false);
        });
    }
  }, [post.id]);

  const handleDeleteComment = async (commentId: number) => {
    const deletedComment = comments.find(comment => comment.id === commentId);

    setDeleteError(false);

    if (!deletedComment) {
      return;
    }

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      setComments(prevComments => [...prevComments, deletedComment]);
      setDeleteError(true);
    }
  };

  const handleAddComment = async (commentData: CommentData) => {
    setAddError(false);

    try {
      const addedComment = await client.post<Comment>('/comments', {
        ...commentData,
        postId: post.id,
      });

      setComments(prevComments => [...prevComments, addedComment]);
    } catch (error) {
      setAddError(true);
      throw error;
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {isCommentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {addError && (
          <div className="notification is-danger">
            Something went wrong while adding a comment
          </div>
        )}

        {deleteError && (
          <div className="notification is-danger">
            Something went wrong while deleting a comment
          </div>
        )}

        {comments.length === 0 && !isCommentsLoading && !isCommentsError && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}
        {!isCommentsLoading && !isCommentsError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>
            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
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
        {!isCommentsLoading && !isCommentsError && !isFormVisible && (
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
      {isFormVisible && <NewCommentForm onAddComment={handleAddComment} />}
    </div>
  );
};
