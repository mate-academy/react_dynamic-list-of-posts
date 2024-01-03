import { showLoader, hideLoader } from './loaderActions';
import { showErrorMessage, hideErrorMessage } from './errorMessageActions';
import { loadUsers, selectUser, deselectUser } from './userActions';
import {
  loadPosts, resetPosts, selectPost, deselectPost,
} from './postsActions';
import {
  loadComments, resetComments, deleteComment, addComment,
} from './commentsActions';
import {
  showAddCommentsForm, hideAddCommentsForm,
} from './commentsFormActions';

export const actions = {
  showLoader,
  hideLoader,
  showErrorMessage,
  hideErrorMessage,
  loadUsers,
  selectUser,
  deselectUser,
  loadPosts,
  resetPosts,
  selectPost,
  deselectPost,
  loadComments,
  deleteComment,
  addComment,
  resetComments,
  showAddCommentsForm,
  hideAddCommentsForm,
};
