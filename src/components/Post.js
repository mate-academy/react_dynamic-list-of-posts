import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';

import User from './User';

import CommentList from './CommentList';

const Post = ({ question }) => (
  <div className="post-item">
    <div className="question-block">
      <User user={question.user} key={question.user.id} />
      <div className="question">
        <h3>
          <p>Question:</p>
          {question.title}
        </h3>
        <article>{question.body}</article>
      </div>
    </div>

    <div className="comments">
      <h3>Answers:</h3>
      <div className="comment-item">
        <hr />
        <Accordion defaultActiveKey="1">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Click for reading comments
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <hr />
                <CommentList comments={question.comments} />
                <hr />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <hr />
      </div>
    </div>
  </div>
);

Post.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.number,
    user: PropTypes.object,
    comments: PropTypes.object,
  }).isRequired,

};

export default Post;
