import React from 'react';

export const NewCommentForm = () => (
  <form>
    <b>Add a comment: </b>

    <div className="form-field">
      <input type="text" name="name" placeholder="Your name" />
    </div>

    <div className="form-field">
      <input type="text" name="email" placeholder="Your email" />
    </div>

    <div className="form-field">
      <textarea name="body" placeholder="Type comment here" />
    </div>

    <button type="submit">Add</button>
  </form>
);
