import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface PostDetailsProps {
  post: Post;
}

export const PostDetails = ({ post }: PostDetailsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);

  const setNewComment = async (data: {
    name: string;
    email: string;
    body: string;
  }): Promise<boolean> => {
    try {
      const createdComment = await client.post<Comment>('/comments', {
        ...data,
        postId: post.id,
      });

      setComments(current => [...current, createdComment]);
      setError('');

      return true;
    } catch {
      setError('Something went wrong');

      return false;
    }
  };

  const deleteComment = async (commentId: number) => {
    const previousComments = comments;

    setComments(current => current.filter(comment => comment.id !== commentId));

    try {
      await client.delete(`/comments/${commentId}`);
      setError('');
    } catch {
      setComments(previousComments);
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      setError('');
      setButtonClick(false);

      try {
        const currentComments = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        setComments(currentComments);
      } catch {
        setError('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {!error && loader && <Loader />}

        {!error && !loader && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!error && !loader && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    className="delete is-small"
                    data-cy="CommentDelete"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!error && !buttonClick && !loader && (
          <button
            type="button"
            className="button is-link"
            data-cy="WriteCommentButton"
            onClick={() => setButtonClick(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {buttonClick && <NewCommentForm dataResponce={setNewComment} />}
    </div>
  );
};
