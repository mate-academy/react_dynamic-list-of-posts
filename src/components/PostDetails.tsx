import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import {
  deleteCommentsByPostId,
  getCommentsByPostId,
  postCommentsByPostId,
} from '../utils/services';
import { Post } from '../types/Post';

interface CommentProps {
  posts: Post[];
  postId: number | undefined;
}

export const PostDetails: React.FC<CommentProps> = ({ postId, posts }) => {
  const [comment, setComment] = useState<Comment[]>([]); // відображення коментарів
  const selectedPost = posts.find(post => post.id === postId); // обраний пост
  const [commentError, setCommentError] = useState(''); // помилка
  const [commentLoading, setCommentLoading] = useState(false); // завантаження
  const [isFormVisible, setisFormVisible] = useState(false); // старн форми

  useEffect(() => {
    if (!postId) {
      setComment([]);

      return;
    }

    setCommentLoading(true);
    setComment([]);
    setCommentError('');
    setisFormVisible(false); // ховаю форму при зміні поста

    getCommentsByPostId(postId)
      .then(data => {
        setComment(data);
      })
      .catch(() => {
        setCommentError('error');
      })
      .finally(() => {
        setCommentLoading(false);
      });
  }, [postId]);

  const handleNewCommentSubmit = async (newComment: {
    name: string;
    email: string;
    body: string;
  }) => {
    const commentAdd: Comment = {
      id: Date.now(),
      name: newComment.name,
      email: newComment.email,
      body: newComment.body,
      postId: postId!,
    };

    await postCommentsByPostId(postId!, commentAdd).then(response => {
      setComment(prevComment => [
        ...prevComment,
        { ...response, id: Date.now() },
      ]);
    });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentsByPostId(commentId)
      .then(() => {
        setComment(prevComment =>
          prevComment.filter(comments => comments.id !== commentId),
        );
      })
      .catch(() => {
        setCommentError('Error');
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {commentLoading && <Loader />}

          {commentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comment.length === 0 && !commentError && !commentLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comment.length > 0 && <p className="title is-4">Comments:</p>}

          {comment.map(comments => (
            <article
              className="message is-small"
              data-cy="Comment"
              key={comments.id}
            >
              <div className="message-header">
                <a href={`mailto:${comments.email}`} data-cy="CommentAuthor">
                  {comments.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comments.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comments.body}
              </div>
            </article>
          ))}

          {!commentError && !commentLoading && !isFormVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setisFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && <NewCommentForm onSubmit={handleNewCommentSubmit} />}
      </div>
    </div>
  );
};
