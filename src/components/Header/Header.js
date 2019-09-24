import React from 'react';

const Header = ({
  isLoading,
  isLoaded,
  hasError,
  getData
}) => {
  const buttonText = isLoading
    ? 'Okay, okay, already loading...'
    : 'GET POSTS RIGHT NOW!!!';

  return (
    <div className="container mb-5">
    <div className="row">
      <header className="header col text-center">
        <h1 className="mb-5">Dynamic list of posts</h1>
        {!isLoaded &&
          <button
            onClick={getData}
            disabled={isLoading}
          >
            {buttonText}
          </button>
        }
        {hasError && 
          <h2 className="mt-3">
            Some kind of mistake, nevermind...
            <br />
            just kick the admin.
          </h2>
        }
      </header>
    </div>
  </div>
  );
};

export default Header;
