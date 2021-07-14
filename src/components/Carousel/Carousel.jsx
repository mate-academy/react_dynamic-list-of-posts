import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Carousel.scss';

const classes = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'end',
  'hidden',
  'hidden',
  'hidden',
  'start',
];

const handleClick = (choise, setClasses) => {
  if (['first', 'second'].includes(choise)) {
    if (choise === 'second') {
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

  if (choise === 'fourth') {
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
    <div className="box">
      <button
        type="button"
        className="btn btn__prev"
        onClick={() => {
          setClasses([...classesList.slice(-1), ...classesList.slice(0, -1)]);
        }}
      />

      <button
        type="button"
        className="btn btn__next"
        onClick={() => {
          setClasses([...classesList.slice(1), classesList[0]]);
        }}
      />

      <ul>
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`wrapper wrapper__${classesList[index]}`}
          >
            <li
              role="menuitem"
              aria-hidden
              className={classNames(
                `card card__${classesList[index]}`,
                { card__active: currentUser.id === user.id },
              )}
              onClick={() => {
                if (classesList[index] !== 'third') {
                  handleClick(classesList[index], setClasses);
                }

                setCurrentUser(user);
              }}
            >
              <img className="author-image" src={user.image} alt="author" />
              <span className="name">
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
