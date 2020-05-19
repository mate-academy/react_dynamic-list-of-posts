import React from 'react';
import './Loading.css';
// import classNames from 'classnames/bind';

type Props = {
  isLoaded: boolean;
};

const Loading: React.FC<Props> = ({ isLoaded }) => (
  <div className={isLoaded ? 'has-background-success' : 'lds-roller'}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loading;
