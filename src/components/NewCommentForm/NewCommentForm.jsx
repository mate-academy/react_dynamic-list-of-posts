import React from 'react';
import './NewCommentForm.scss';
import PropTypes from 'prop-types';

export class NewCommentForm extends React.Component {
  state = {
    name: '',
    email: '',
    body: '',
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { name, email, body } = this.state;

    event.preventDefault();

    this.props.saveComment({
      name,
      email,
      body,
    });

    this.setState({
      name: '',
      email: '',
      body: '',
    });
  };

  render() {
    return (
      <form
        className="NewCommentForm"
        onSubmit={this.handleSubmit}
      >
        <div className="form-field">
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Your name"
            className="NewCommentForm__input"
            onChange={this.handleOnChange}
            required
          />
        </div>

        <div className="form-field">
          <input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="Your email"
            className="NewCommentForm__input"
            onChange={this.handleOnChange}
            required
          />
        </div>

        <div className="form-field">
          <textarea
            name="body"
            value={this.state.body}
            placeholder="Type comment here"
            className="NewCommentForm__input"
            onChange={this.handleOnChange}
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
  }
}

NewCommentForm.propTypes = {
  saveComment: PropTypes.func.isRequired,
};
