import { useState } from 'react';
import { postComment } from '../../api/comments';
import { Comment } from '../../types/Comment';
import './NewCommentForm.scss';

type Props = {
  postId: number;
  setCommentsToPost: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const NewCommentForm: React.FC<Props> = (
  {
    postId, setCommentsToPost,
  },
) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const submitHandler = () => {
    if (name === '' || email === '' || body === '') {
      return;
    }

    const newComment = {
      postId,
      name,
      email,
      body,
    };

    postComment(newComment)
      .then(res => {
        if (res.body) {
          setCommentsToPost(prev => {
            return [...prev, res];
          });
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(`${err.message}`);
      });

    setName('');
    setEmail('');
    setBody('');
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
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
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
