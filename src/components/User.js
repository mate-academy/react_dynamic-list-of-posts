import React from 'react';

function User(props) {
    return (
        <div>
            <i>{props.name},</i>
            <p>{props.address}</p>
            <a href={"mailto:" + props.email}>{props.email}</a>
        </div>
    );
}

export default User;
