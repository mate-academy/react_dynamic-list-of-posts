import React, { useEffect, useState } from 'react';
import { CommentToPost } from '../../types/comment-to-post';
import { postComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: string,
  reloadComments: () => void,
}

export const NewCommentForm: React.FC<Props>
= ({ postId, reloadComments }) => {
  const [data, setData] = useState<CommentToPost>({
    postId: +postId,
    name: '',
    email: '',
    body: '',
  });

  useEffect(() => {
    const updatedData = { ...data };

    updatedData.postId = +postId;
    setData(updatedData);
  }, [postId]);

  const dataChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = { ...data };

    updatedData[event.target.name] = event.target.value;
    setData(updatedData);
  };

  const textChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedData = { ...data };

    updatedData[event.target.name] = event.target.value;
    setData(updatedData);
  };

  async function sendCommentToServer() {
    await postComment(data)
      .then(() => {
        reloadComments();
        setData({
          postId: +postId,
          name: '',
          email: '',
          body: '',
        });
      });
  }

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={data.name}
          onChange={dataChangeHandler}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={data.email}
          onChange={dataChangeHandler}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={data.body}
          onChange={textChangeHandler}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={sendCommentToServer}
      >
        Add a comment
      </button>
    </form>
  );
};
