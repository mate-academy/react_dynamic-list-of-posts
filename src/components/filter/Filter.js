import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

class Filter extends React.Component {

  render() {
  const { activeFilter } = this.props;

  return (
      <Button.Group>
        <Button onClick={() => activeFilter('name')}>Sort by author name</Button>
        <Button onClick={() => activeFilter('title')}>Sort by post title</Button>
        <Button onClick={() => activeFilter('text')}>Sort by post text</Button>
        <Button onClick={() => activeFilter('reset')}>Reset</Button>
      </Button.Group>
    )
  }
}

Filter.propTypes = {
  activeFilter: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Filter;
