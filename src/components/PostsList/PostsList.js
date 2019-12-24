import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Card, Input } from 'semantic-ui-react';
import url from './PostsLists.constants';
import getData from './PostsLists.fetch';
import Post from '../Post/Post';
import 'semantic-ui-css/semantic.min.css';

function PostsList({ load }) {
  const initialState = {
    loading: load,
    preparedData: [],
    inputValue: '',
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchData = async() => {
      const [
        usersFromServer,
        postsFromServer,
        commentsFromServer,
      ] = await Promise.all([
        getData(url.USERS),
        getData(url.POSTS),
        getData(url.COMMENTS),
      ]);

      setState(prev => ({
        ...prev,
        loading: false,
        preparedData: postsFromServer.map(post => ({
          ...post,
          user: usersFromServer.find(user => user.id === post.userId),
          comments: commentsFromServer
            .filter(comment => comment.postId === post.id),
        })),
      }));
    };

    setTimeout(fetchData, 300);
  }, []);

  const SearchQuery = (event) => {
    const searchValue = event.target.value.trim();

    setState(prev => ({
      ...prev,
      inputValue: searchValue,
    }));
  };

  const { loading, preparedData, inputValue } = state;

  const renderPosts = inputValue === ''
    ? preparedData
    : preparedData
      .filter(({ title, body }) => title
        .toLowerCase().includes(inputValue)
        || body.toLowerCase().includes(inputValue));

  return (
    <>
      {loading
        ? (
          <Dimmer active>
            <Loader size="huge">Preparing Files</Loader>
          </Dimmer>
        )
        : (
          <>
            <Input
              onChange={SearchQuery}
              icon="search"
              placeholder="Search..."
            />
            <Card className="test">
              {renderPosts.map(currentPost => (
                <Post
                  key={currentPost.id}
                  postData={currentPost}
                />
              ))}
            </Card>
          </>
        )}

    </>
  );
}

export default PostsList;

PostsList.propTypes = {
  load: PropTypes.shape({
    load: PropTypes.bool,
  }).isRequired,
};
