import React from 'react';
import './User.css';

function User(props) {
    return (
        <div className='user'>
            <div className='name'>{props.user.name}</div>
            <div className='email'>{props.user.email}</div>
            <div className='address'>{props.user.address.street}</div>
        </div>
    );
}

export default User;