import './NewCommentForm.scss';
import React, { FormEvent, useState } from 'react';
import { Comment } from '../../react-app-env';

type Props = {
  commentsList: Comment[] | undefined;
  setCommentsList: (arg:Comment[]) => void;
};

export const NewCommentForm: React.FC<Props> = ({
  commentsList, setCommentsList,
}) => {
  const [yourname, setYourname] = useState('');
  const [youremail, setYouremail] = useState('');
  const [yourcomment, setYourcomment] = useState('');
  const [error, setError] = useState(false);

  const addComment = (newComment: Comment) => {
    if (commentsList) {
      commentsList.unshift(newComment);
      const copy = [...commentsList];

      setCommentsList(copy);
    }
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (yourname && youremail && yourcomment && commentsList) {
      const newComment = {
        id: commentsList.length + 1,
        postId: commentsList[0].postId,
        name: yourname,
        email: youremail,
        body: yourcomment,
      };

      addComment(newComment);
      setError(false);
      setYourname('');
      setYouremail('');
      setYourcomment('');
    } else {
      setError(true);
    }
  };

  return (
    <form
      className="NewCommentForm"
      onSubmit={submitHandler}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={yourname}
          className="NewCommentForm__input"
          onChange={(event) => {
            setYourname(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={youremail}
          onChange={(event) => {
            setYouremail(event.target.value);
          }}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={yourcomment}
          onChange={(event) => {
            setYourcomment(event.target.value);
          }}
        />
      </div>
      {error && (
        <div style={{ color: 'red' }}>
          Add correct data
        </div>
      )}

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
