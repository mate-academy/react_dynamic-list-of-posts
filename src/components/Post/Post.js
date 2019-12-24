import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import User from '../User';
import CommentList from '../CommentList';

const Post = ({ searchedText, title, body, comments, user }) => {
  const highlightText = (text) => {
    if (!searchedText) {
      return text;
    }

    const parts = text.split(new RegExp(`(${searchedText})`, 'gi'));

    return parts.map((part, i) => (
      <React.Fragment key={`${part + i}`}>
        {part.toLowerCase() === searchedText.toLowerCase()
          ? <span>{part}</span>
          : part}
      </React.Fragment>
    ));
  };

  return (
    <Segment className="posts" color="red">
      <Header as="h2">{highlightText(title)}</Header>
      {highlightText(body)}
      <Segment color="blue">
        <User {...user} />
        <CommentList list={comments} />
      </Segment>
    </Segment>
  );
};

Post.propTypes = {
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
  searchedText: PropTypes.string.isRequired,
};

export default Post;
