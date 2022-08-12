import React, { useState } from 'react';
import { CommentToPost } from '../../types/comment-to-post';
import { postComment } from '../../api/comments';
import './NewCommentForm.scss';

interface Props {
  postId: string,
  rerender: (arg0:boolean) => void,
  renderState: boolean,
}

export const NewCommentForm: React.FC<Props>
= ({ postId, rerender, renderState }) => {
  const [data, setData] = useState<CommentToPost>({
    postId: +postId,
    name: '',
    email: '',
    body: '',
  });

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

  /*
  const sendCommentToServer = () => {
    console.log(data);
    postComment(data);
    setData({
      postId: +postId,
      name: '',
      email: '',
      body: '',
    });
  };
  */
  async function sendCommentToServer() {
    console.log(data);
    await postComment(data)
      .then(() => rerender(!renderState));

    console.log('comment sent');
  }

  /*
  async function loadUserPosts(userNumber:string) {
    const loaded = await getUserPosts(userNumber);

    setLoadedPosts(loaded);
  }
*/

  return (
    <form className="NewCommentForm">
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={data.name}
          onChange={(e) => dataChangeHandler(e)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={data.email}
          onChange={(e) => dataChangeHandler(e)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={data.body}
          onChange={(e) => textChangeHandler(e)}
        />
      </div>

      <button
        type="button"
        className="NewCommentForm__submit-button button"
        onClick={
          sendCommentToServer
        }
      >
        Add a comment
      </button>
    </form>
  );
};
