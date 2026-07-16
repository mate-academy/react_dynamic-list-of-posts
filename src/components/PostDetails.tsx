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

  const setNewComment = data => {
    const comment = {
      ...data,
      postId: post.id,
    };

    return client.post<Comment>('/comments', comment).then(createdComment => {
      setComments(current => [...current, createdComment]);

      return true;
    });
  };

  const deleteComment = (commentId: number) => {
    client.delete(`/comments/${commentId}`).then(() => {
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== commentId),
      );
    });
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
      } catch (e) {
        setError('Something went wrong');
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {/* 1. Якщо є помилка — показуємо ТІЛЬКИ її */}
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {/* 2. Лоудер показуємо, якщо йде завантаження і немає помилки */}
          {!error && loader && <Loader />}

          {/* 3. "No comments yet" показуємо, тільки якщо успішно завантажили, але коментарів 0 */}
          {!error && !loader && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {/* 4. Список коментарів показуємо, коли вони є і немає помилок */}
          {!error && !loader && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(currentComment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={currentComment.id}
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${currentComment.email}`}
                      data-cy="CommentAuthor"
                    >
                      {currentComment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deleteComment(currentComment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {currentComment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {/* 5. Кнопку "Write a comment" теж логічно ховати при помилці */}
          {!error && !buttonClick && !loader && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setButtonClick(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {buttonClick && (
          <NewCommentForm dataResponce={data => setNewComment(data)} />
        )}
      </div>
    </div>
  );
};
