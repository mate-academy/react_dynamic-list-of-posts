import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Fields } from '../types/Fields';
import { Notification } from './Notification/Notification';

type Props = {
  post: Post | null;
  loading: string;
  errorMessage: string;
  isOpenAddComment: boolean;
  comments: Comment[];
  openAddCommentForm: () => void;
  addComment: (name: string, email: string, body: string) => void;
  delComment: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  post,
  loading,
  errorMessage,
  comments,
  isOpenAddComment,
  openAddCommentForm,
  addComment,
  delComment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [invalidFields, setInvalidFields] = useState<Fields[]>([]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (invalidFields.includes('name')) {
      setInvalidFields(prevFields =>
        [...prevFields].filter(field => field !== 'name'),
      );
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (invalidFields.includes('email')) {
      setInvalidFields(prevFields =>
        [...prevFields].filter(field => field !== 'email'),
      );
    }
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentText(event.target.value);
    if (invalidFields.includes('textarea')) {
      setInvalidFields(prevFields =>
        [...prevFields].filter(field => field !== 'textarea'),
      );
    }
  };

  const validateFormFields = () => {
    const fields: Fields[] = [];

    if (!name.trim()) {
      fields.push('name');
    }

    if (!email.trim()) {
      fields.push('email');
    }

    if (!commentText.trim()) {
      fields.push('textarea');
    }

    setInvalidFields(fields);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInvalidFields([]);
    if (!name.trim() || !email.trim() || !commentText.trim()) {
      validateFormFields();

      return;
    }

    addComment(name, email, commentText);

    setCommentText('');
  };

  const clearFormFields = () => {
    setName('');
    setEmail('');
    setCommentText('');
    setInvalidFields([]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        {loading === 'comments' && <Loader />}

        {(errorMessage === 'comments' || errorMessage === 'addComment') && (
          <Notification
            content="Something went wrong"
            dataCy="CommentsError"
            classType="is-danger"
          />
        )}

        {!errorMessage && comments.length === 0 && !loading && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && loading !== 'comments' && !errorMessage && (
          <p className="title is-4">Comments:</p>
        )}

        {loading !== 'comments' &&
          !errorMessage &&
          comments.map(comment => (
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
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => delComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

        {!isOpenAddComment && !errorMessage && !loading && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={openAddCommentForm}
          >
            Write a comment
          </button>
        )}
      </div>

      {errorMessage === 'delete' && (
        <Notification
          content="Something went wrong!"
          classType="is-danger"
          dataCy="PostsLoadingError"
        />
      )}

      {isOpenAddComment && !errorMessage && (
        <NewCommentForm
          errorMessage={errorMessage}
          handleChangeName={handleChangeName}
          handleChangeEmail={handleChangeEmail}
          handleChangeTextarea={handleChangeTextarea}
          handleSubmit={handleSubmit}
          invalidFields={invalidFields}
          name={name}
          email={email}
          commentText={commentText}
          loading={loading}
          clearFormFields={clearFormFields}
        />
      )}
    </div>
  );
};
