import React from 'react';
import PropTypes from 'prop-types';

import CommentList from '../commentList/CommentList';

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
    }

    this.postPhoto = `https://source.unsplash.com/collection/190727/
    ${this.randomPhoto()}
    /?food,game,car,nature,animal`
  }

  randomPhoto = () => {
    return `
    ${Math.round(Math.random() * (550 - 500) + 500)}x
    ${Math.round(Math.random() * (500 - 450) + 450)}
    `
  }

  showComments = () =>
    this.setState(
      (prevState) => ({hidden: !prevState.hidden})
    );

  render() {

    const {
      id,
      title,
      body,
      comments,
      user: {
        name,
        email,
        address: {
          city
        }
      }
    } = this.props.post;

    return (
      <div className="post">
        <div className="authorName">
          <strong>{name}</strong>
          <span>{email}</span>
          <span>{city}</span>
        </div>
        <div className="photo"><img src={this.postPhoto} className="main-image" alt='post' /></div>
        <p className="title"><strong>{title}</strong></p>
        <div className="bodyText">{body}</div>
        <span className={"commentsVisible"} onClick={this.showComments}>
          <strong>Watch comments ({comments.length})</strong></span>
        <div hidden={this.state.hidden} key={id}>
          <CommentList comments={comments} />
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  key: PropTypes.number.isRequired,
}
//
export default Post;


