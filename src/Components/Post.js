import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';

const Post = ({ bolderText, id, title, body, user, comments }) => {
  const boldText = (text) => {
    if (!bolderText) {
      return text;
    }

    const article = text.split(new RegExp(`(${bolderText})`, 'gi'));

    return article.map((part, i) => (
      <Fragment key={`${part + i}`}>
        {part.toLowerCase() === bolderText.toLowerCase()
          ? <span>{part}</span>
          : part}
      </Fragment>
    ));
  };

  return (
    <section>
      <>
        <article>
          <p className="post__id">{`Post ${id}`}</p>
          <h2>
            {boldText(title)}
          </h2>

          <p>
            {boldText(body)}
          </p>
        </article>

        <User {...user} />
      </>

      <CommentList list={comments} />
    </section>
  );
};

Post.propTypes = {
  bolderText: PropTypes.string,
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.object
  ),
}.isRequired;

export default Post;
