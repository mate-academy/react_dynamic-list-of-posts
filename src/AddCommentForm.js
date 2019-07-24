import React from 'react';

class AddCommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      comment: '',
    };
  }

  setChanges = (event, field) => {
    const { value } = event.target;
    let correctValue = String(value);

    switch (field) {
      case 'name':
        correctValue = correctValue.replace(/[^\wА-Яа-яЁё .-]/g, '');
        break;
      case 'email':
        correctValue = correctValue.replace(/[^\w@.-_]/g, '');
        break;
      default:
        correctValue = correctValue.replace(/[`]/g, '');
    }

    this.setState(prevState => ({
      [field]: correctValue,
    }));
  }

  render() {
    return (
      <form>
        <fieldset>
          <legend>add Your Comment here</legend>

          <div className="formDiv">
            <label>
              Your Name:
              <input
                type="text"
                placeholder="Enter name here"
                value={this.state.name}
                onChange={event => this.setChanges(event, 'name')}
              />
            </label>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <label>
              Your e-mail:
              <input
                type="email"
                placeholder="Enter e-mail here"
                value={this.state.email}
                onChange={event => this.setChanges(event, 'email')}
              />
            </label>
          </div>

          <div className="formDiv">
            <label>
              Comment:
              <textarea
                cols="60"
                rows="3"
                value={this.state.comment}
                onChange={event => this.setChanges(event, 'comment')}
              />
            </label>
          </div>

          <div className="formDiv">
            <button onClick={(event) => {
              event.preventDefault();

              return this.props.handleClose();
            }}>
              Cancel
            </button>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

            <button onClick={(event) => {
              event.preventDefault();

              return this.props.addComment(this.props.postId, this.state.name, this.state.email, this.state.comment);
            }}>
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default AddCommentForm;
