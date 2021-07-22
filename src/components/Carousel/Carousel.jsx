import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Carousel.scss';

const classes = [
  'left-small',
  'left-middle',
  'front',
  'right-middle',
  'right-small',
  'final-hidden',
  'hidden',
  'hidden',
  'hidden',
  'initial-hidden',
];

const handleClick = (choise, setClasses) => {
  if (['left-small', 'left-middle'].includes(choise)) {
    if (choise === 'left-middle') {
      setClasses(prevClasses => (
        [...prevClasses.slice(1), prevClasses[0]]
      ));
    } else {
      setClasses(prevClasses => (
        [...prevClasses.slice(1), prevClasses[0]]
      ));
      setClasses(prevClasses => (
        [...prevClasses.slice(1), prevClasses[0]]
      ));
    }

    return;
  }

  if (choise === 'right-middle') {
    setClasses(prevClasses => (
      [...prevClasses.slice(-1), ...prevClasses.slice(0, -1)]
    ));
  } else {
    setClasses(prevClasses => (
      [...prevClasses.slice(-1), ...prevClasses.slice(0, -1)]
    ));
    setClasses(prevClasses => (
      [...prevClasses.slice(-1), ...prevClasses.slice(0, -1)]
    ));
  }
};

export const Carousel = ({ users, callBack }) => {
  const [classesList, setClasses] = useState(classes);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      callBack('currentUser', currentUser);
    }
  }, [currentUser]);

  return (
    <div className="carousel">
      <button
        type="button"
        className="btn btn__prev"
        onClick={() => {
          setClasses([...classesList.slice(-1), ...classesList.slice(0, -1)]);
        }}
      >
        &#8249;
      </button>

      <button
        type="button"
        className="btn btn__next"
        onClick={() => {
          setClasses([...classesList.slice(1), classesList[0]]);
        }}
      >
        &#8250;
      </button>

      <ul>
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`wrapper wrapper--${classesList[index]}`}
          >
            <li
              role="menuitem"
              aria-hidden
              className={classNames(
                'carousel__card',
                `carousel__card--${classesList[index]} `,
                { 'carousel__card--active': currentUser.id === user.id },
                'author',
              )}
              onClick={() => {
                if (classesList[index] !== 'front') {
                  handleClick(classesList[index], setClasses);
                }

                setCurrentUser(user);
              }}
            >
              <img
                className="author__image"
                src={user.image}
                alt="author-avatar"
              />
              <span className="author__name">
                {user.name}
              </span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

Carousel.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  callBack: PropTypes.func.isRequired,
};
