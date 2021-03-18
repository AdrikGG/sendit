import React from 'react';

import './UserBar.css';

const UserBar = ({ users }) => (
  <div className="UserBar">
    {
      users
        ? (
          <div>
            <h1>Active Users</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default UserBar;