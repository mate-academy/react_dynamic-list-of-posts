import classNames from 'classnames';
import { Dispatch, useState } from 'react';
import { Post } from '../types/Post';
import { postComment } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  postSelected: Post | null;
  setComments: Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = ({
  postSelected,
  setComments,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [hasErrorName, setHasErrorName] = useState(false);
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorBody, setHasErrorBody] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [commentError, setCommentError] = useState(''); // Estado para mensagem de erro

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setHasErrorName(false);
  };

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setHasErrorEmail(false);
  };

  const handleInputBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setHasErrorBody(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (postSelected === null) {
      return;
    }

    if (!name.trim() || !email.trim() || !body.trim()) {
      setHasErrorName(!name.trim());
      setHasErrorEmail(!email.trim());
      setHasErrorBody(!body.trim());

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setHasErrorEmail(true);
      // eslint-disable-next-line no-console
      console.error('Por favor, insira um endereço de email válido.');

      return;
    }

    if (!hasErrorName && !hasErrorEmail && !hasErrorBody) {
      setAddLoading(true);
      setCommentError(''); // Limpa a mensagem de erro antes de tentar novamente

      const newComment = {
        id: 0,
        name: name,
        email: email,
        body: body,
        postId: postSelected?.id ?? 0,
      };

      postComment(newComment)
        .then(comment => {
          setComments(prevComments => [...prevComments, comment as Comment]);
          setAddLoading(false);
          setBody('');
        })
        .catch(error => {
          setAddLoading(false);
          // eslint-disable-next-line no-console
          console.error('Erro ao enviar o comentário:', error);
          setCommentError('Não foi possível adicionar o comentário.');
        });
    }
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setHasErrorName(false);
    setHasErrorEmail(false);
    setHasErrorBody(false);
    setCommentError(''); // Limpa a mensagem de erro ao limpar o formulário
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': hasErrorName })}
            value={name}
            onChange={handleInputName}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {hasErrorName && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasErrorName && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': hasErrorEmail })}
            value={email}
            onChange={handleInputEmail}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
          {hasErrorEmail && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasErrorEmail && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>
        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': hasErrorBody })}
            value={body}
            onChange={handleInputBody}
          />
        </div>
        {hasErrorBody && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      {/* Mensagem de erro ao enviar o comentário */}
      {commentError && (
        <div className="notification is-danger">{commentError}</div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': addLoading,
            })}
          >
            Add
          </button>
        </div>

        <div className="control">
          <button
            type="reset"
            className="button is-link is-light"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
