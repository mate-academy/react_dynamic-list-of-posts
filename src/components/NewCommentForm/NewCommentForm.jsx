import React, { useState } from 'react';
import './NewCommentForm.scss';
import { addComment } from '../../api/comments'
// "id":1963,"postId":null,"name":null,"email":null,"body":null
export const NewCommentForm = ({ selectedPostId }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    addComment('/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId: selectedPostId,
        name,
        email,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    setName('')
    setEmail('')
    setBody('')
  }

  return (
    <form
      className="NewCommentForm"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="NewCommentForm__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-field">
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className="NewCommentForm__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  )
};
