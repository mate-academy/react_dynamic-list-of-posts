import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [visible, setVisible] = useState(false);

  const loadComments = async () => {
    setLoaded(false);
    setHasError(false);
    setVisible(false);

    try {
      // setHasError(false);
      const getComments = await client.get<Comment[]>(`/comments?postId=${post.id}`);

      setComments(getComments);
    } catch (error) {
      setHasError(true);
    }

    setLoaded(true);
  };

  useEffect(() => {
    loadComments();
  }, [post.id]);

  //  export const createComment = (data: Omit<Comment, 'id'>) => {
  //   return client.post<Comment>('/comments', data);
  //  };

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await client.post<Comment>('/comments', {
        name,
        email,
        body,
        postId: post.id,
      });

      setComments((prevComments) => {
        const newComments = [...prevComments, newComment];

        return newComments;
      });
    } catch (error) {
      setHasError(true);
    }
  };

  const deleteComment = async (commentId: number) => {
    setComments(
      currentComments => currentComments.filter(
        comment => comment.id !== commentId,
      ),
    );

    await client.delete(`/comments/${commentId}`);
  };

  return (
    <div className="content">
      <div className="block">
        <h2>
          {`#${post.id}: ${post.title}`}
        </h2>
        <p>{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div className="notification is-danger">
            Something went wrong
          </div>
        )}

        {loaded && !hasError && comments.length === 0 && (
          <p className="title is-4">No comments yet</p>
        )}

        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article className="message is-small" key={comment.id}>
                <div className="message-header">
                  <a href={`mailto:${comment.email}`}>
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            type="button"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
