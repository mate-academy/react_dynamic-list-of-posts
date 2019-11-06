import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import { ItemGroup } from 'semantic-ui-react';
import Post from '../post/Post';

const PostList = ({ postData }) => (
  <Grid container centered>
    <Grid.Column tablet="10">

      <ItemGroup divided>
        {postData.map(post => (
          <Post key={post.id} postData={post} />
        ))}
      </ItemGroup>
    </Grid.Column>
  </Grid>
);

PostList.propTypes = {
  postData: PropTypes.shape().isRequired,
};

export default PostList;
