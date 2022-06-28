import './NewCommentForm.scss';
import React, { FormEvent, useState } from 'react';
import { Comment } from '../../react-app-env';
import { postComment, getComments } from '../../api/comments';

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

  const addComment = async (newComment: Comment) => {
    if (commentsList) {
      postComment(
        newComment.name,
        newComment.email,
        newComment.body,
        newComment.postId,
      );

      const afterAdded = await getComments(newComment.postId);

      setCommentsList(afterAdded);
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
          required
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
          type="email"
          name="email"
          required
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
          required
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
