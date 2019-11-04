import React, { Component } from 'react';
import { Input, Segment } from 'semantic-ui-react';

import Cards from './Cards';

class PostList extends Component {
  state = {
    filter: '',
  };

  addFilter = (event) => {
    const filter = event.target.value;

    this.setState({
      filter,
    });
  };

  render() {
    const { postsInfo } = this.props;
    const { filter } = this.state;
    const filteredInfo = [...postsInfo].filter(post => post.title.includes(filter) || post.body.includes(filter) || post.user.name.includes(filter) || post.user.email.includes(filter));

    return (
      <Segment inverted>
        <Input
          inverted
          type="text"
          className="input"
          placeholder="Find alike ..."
          icon="search"
          onChange={this.addFilter}
        />

        {filteredInfo.map(post => (<Cards post={post} key={post.id} />))}
      </Segment>
    );
  }
}

export default PostList;
