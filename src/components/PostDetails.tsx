import React, { useEffect, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';
import { Loader } from './Loader';

interface Props {
  post?: Post | null;
  onClose: () => void;
}

export const PostDetails: React.FC<Props> = ({ post, onClose }) => {
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

        <button type="button" className="delete" onClick={onClose}>
          Close
        </button>
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
          <ul>
            {comments.map(c => (
              <li key={c.id} data-cy="Comment">
                <strong>{c.name}</strong>: {c.body}
              </li>
            ))}
          </ul>
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
      {showForm && (
        <NewCommentForm
          defaultName="Marcel"
          defaultEmail="marcel@test.com"
          onSubmit={handleAddComment}
        />
      )}
    </div>
  );
};
