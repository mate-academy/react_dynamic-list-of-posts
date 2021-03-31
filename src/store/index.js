import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { requestPosts } from '../api/api';

const SET_POSTS = 'SET_POSTS';
const SET_POST_ID = 'SET_POST_ID';

export const setPosts = posts => ({
  type: SET_POSTS, posts,
});
export const setPostId = postId => ({
  type: SET_POST_ID, postId,
});

export const statePosts = state => state.posts;
export const selectedPostId = state => state.postId;

const initialState = {
  posts: [],
  postId: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: [...action.posts],
      };

    case SET_POST_ID:
      return {
        ...state,
        postId: action.postId,
      };

    default:
      return state;
  }
};

export const getPosts = () => (dispatch) => {
  requestPosts()
    .then((posts) => {
      dispatch(setPosts(posts));
    });
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
