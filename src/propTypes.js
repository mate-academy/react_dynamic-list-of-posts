import propTypes from 'prop-types';

propTypes.state = {
  users: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    username: propTypes.string,
    email: propTypes.string,
    address: propTypes.shape({
      street: propTypes.string,
      suite: propTypes.string,
      city: propTypes.string,
    }),
    phone: propTypes.string,
    website: propTypes.string,
    company: propTypes.shape({
      name: propTypes.string,
    }),
  }),
  todos: propTypes.shape({
    userId: propTypes.number,
    id: propTypes.number,
    title: propTypes.string,
    completed: propTypes.boolean,
  }),
};

export default propTypes;
