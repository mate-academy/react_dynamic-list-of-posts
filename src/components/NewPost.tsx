import { useState } from 'react';
import { postPost } from '../api/posts';

export const NewPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleOnSubmitPost = () => {
    postPost({ userId: 962, title: title, body: body });
  };

  return (
    <div className="container">
      <div className="notification has-background-light	">
        <form onSubmit={handleOnSubmitPost}>
          <div className="field">
            <label className="label" htmlFor="post-title">
              Title
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
                id="post-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="post-body">
              Body
            </label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Textarea"
                id="post-body"
                value={body}
                onChange={e => setBody(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="control">
            <button className="button is-primary">Add post</button>
          </div>
        </form>
      </div>
    </div>
  );
};
