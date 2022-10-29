import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [error, setError] = useState('error');
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState(false);

  const loadComment = async (postId: number) => {
    try {
      setIsLoading(true);
      const getComments = await client.get<Comment[]>(`/comments?postId=${postId}`);

      setPostComments(getComments);
    } catch {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (post?.id) {
      setNewComment(false);
      setPostComments([]);
      loadComment(post.id);
    }
  }, [post]);

  const deleteComment = async (id: number) => {
    const findComments = postComments.find(comment => comment.id === id);

    if (!findComments) {
      return;
    }

    try {
      setPostComments(state => (
        state.filter(comment => comment.id !== id)
      ));
      await client.delete(`/comments/${id}`);
    } catch {
      setPostComments(state => (
        [
          ...state,
          findComments,
        ]
      ));
    }
  };

  const addComment = async (comment: {}) => {
    try {
      const addCommentToPost = await client.post<Comment>('/comments', comment);

      setPostComments(state => (
        [
          ...state,
          addCommentToPost,
        ]
      ));
    } catch {
      setError(error);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>
        <div className="block">
          {isLoading && (
            <Loader />
          )}

          {/* <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p> */}
          {!postComments.length || (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
          <p className="title is-4">Comments:</p>
          {(!newComment && !isLoading) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setNewComment(true)}
            >
              Write a comment
            </button>
          )}

        </div>
        {newComment && !isLoading && (
          <NewCommentForm
            postId={post?.id}
            addComment={addComment}
          />
        )}

      </div>
    </div>
  );
};
