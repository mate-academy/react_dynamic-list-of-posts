import React, { useEffect, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';

interface Props {
  post?: Post | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    setLoadingComments(true);
    setErrorComments(null);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setErrorComments('Erro ao carregar comentários'))
      .finally(() => setLoadingComments(false));
  }, [post]);

  const handleAddComment = async (data: CommentData) => {
    try {
      const newComment = await client.post<Comment>('/comments', {
        ...data,
        postId: post?.id,
      });

      setComments(prev => [...prev, newComment]); // adiciona ao fim da lista
    } catch {
      alert('Erro ao adicionar comentário. Tente novamente.');
    }
  };

  const handleDeleteCommment = async (id: number) => {
    const prev = comments;

    setComments(prev.filter(c => c.id !== id));

    try {
      await client.delete(`/comments/${id}`);
    } catch {
      alert('Delete comment error. Try again.!');
      setComments(prev);
    }
  };

  if (!post) {
    return (
      <div className="notification is-info" data-cy="NoPostSelected">
        Nenhum post selecionado
      </div>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>
      <div className="block">
        {loadingComments && <Loader />}
        {errorComments && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong!
          </div>
        )}
        {!loadingComments && !errorComments && comments.length === 0 && (
          <p data-cy="NoCommentsMessage">No comments yet</p>
        )}
        {!loadingComments && !errorComments && comments.length > 0 && (
          <>
            <h3 className="comments-title">Comments:</h3>

            <ul>
              {comments.map(c => (
                <li key={c.id} data-cy="Comment" className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author" data-cy="CommentAuthor">
                      {c.name}
                    </span>

                    <button
                      type="button"
                      className="delete"
                      onClick={() => handleDeleteCommment(c.id)}
                      data-cy="CommentDelete"
                    />
                  </div>

                  <p className="comment-body" data-cy="CommentBody">
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {!showForm && (
        <button
          type="button"
          className="button is-link"
          data-cy="WriteCommentButton"
          onClick={() => setShowForm(true)}
        >
          Write a comment
        </button>
      )}

      {/* Formulário só aparece depois do clique */}
      {showForm && <NewCommentForm onSubmit={handleAddComment} />}
    </div>
  );
};
