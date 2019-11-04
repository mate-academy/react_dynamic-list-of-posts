import React, { Component } from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
import CommentsList from './CommentsList';

class DropDown extends Component {
  state = {
    activeIndex: -1,
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { comments } = this.props;
    const { activeIndex } = this.state;

    return (
      <Segment inverted>
        <Accordion inverted>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={this.handleClick}
          >
            <Icon name="dropdown" />
            COMMENTS
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {comments.map(comment => (<CommentsList comment={comment} key={comment.id} />))}
          </Accordion.Content>
        </Accordion>
      </Segment>
    );
  }
}

export default DropDown;
