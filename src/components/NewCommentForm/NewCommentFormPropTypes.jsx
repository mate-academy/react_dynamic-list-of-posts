import PropTypes from 'prop-types';

export const NewCommentFormPropTypes = {
  selectedPostId: PropTypes.number.isRequired,
  setDeleteOrAddWait: PropTypes.func.isRequired,
  setWaitForComments: PropTypes.func.isRequired,
};
