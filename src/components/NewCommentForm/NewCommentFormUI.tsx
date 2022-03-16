type Props = {
  name: string,
  body: string,
  email: string,
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleOnSubmit: () => void
};

export const NewCommentFormUi: React.FC<Props> = ({
  body,
  name,
  email,
  handleOnChange,
  handleOnSubmit,
}) => (
  <form className="NewCommentForm">
    <div className="form-field">
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Your name"
        className="NewCommentForm__input"
        onChange={handleOnChange}
      />
    </div>

    <div className="form-field">
      <input
        type="text"
        name="email"
        value={email}
        placeholder="Your email"
        className="NewCommentForm__input"
        onChange={handleOnChange}
      />
    </div>

    <div className="form-field">
      <textarea
        name="body"
        value={body}
        placeholder="Type comment here"
        className="NewCommentForm__input"
        onChange={handleOnChange}
      />
    </div>

    <button
      type="button"
      className="NewCommentForm__submit-button button"
      onClick={handleOnSubmit}
    >
      Add a comment
    </button>
  </form>
);
