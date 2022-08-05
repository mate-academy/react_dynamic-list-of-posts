import { useState } from 'react';
import './NewCommentForm.scss';
import { postPostComment } from '../../api/comments';

type Props = {
  postId: number;
  commentsNumber: number;
  setCommentsNumber: React.Dispatch<React.SetStateAction<number>>;
};

export const NewCommentForm: React.FC<Props> = (
  { postId, commentsNumber, setCommentsNumber },
) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const submitHandler = () => {
    if (name === '' || email === '' || body === '') {
      return;
    }

    const createdAt = (new Date()).toISOString();
    const updatedAt = createdAt;

    const newComment = {
      body,
      createdAt,
      email,
      id: commentsNumber + 1,
      name,
      postId,
      updatedAt,
    };

    postPostComment(postId, newComment)
      .then(res => {
        setName(''); setEmail(''); setBody('');
        if (res.ok) {
          setCommentsNumber(prev => prev + 1);
        }
      });
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      </div>

      <div className="form-field">
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          onChange={(e) => {
            setBody(e.target.value);
          }}
          value={body}
          required
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
