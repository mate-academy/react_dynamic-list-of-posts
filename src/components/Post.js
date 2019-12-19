import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ highlightedText, id, title, body, user, comments }) => {
  const highlightText = (text) => {
    if (!highlightedText) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlightedText})`, 'gi'));

    return parts.map((part, i) => (
      <Fragment key={`${part + i}`}>
        {part.toLowerCase() === highlightedText.toLowerCase()
          ? <span className="highlighted-text">{part}</span>
          : part}
      </Fragment>
    ));
  };

  return (
    <article className="post">
      <div className="post__container">
        <article className="post__information">
          <p className="post__number">{`Post ${id}:`}</p>

          <h2 className="post__title">
            {highlightText(title)}
          </h2>

          <p className="post__content">
            {highlightText(body)}
          </p>
        </article>

        <User {...user} />
      </div>

      <CommentList list={comments} />
    </article>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  highlightedText: PropTypes.string.isRequired,
};

export default Post;
