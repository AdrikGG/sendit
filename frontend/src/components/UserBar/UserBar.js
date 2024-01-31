import React from 'react';

import './UserBar.css';

const UserBar = ({ users }) => {
  return (
    <div className="UserBar">
      {users ? (
        <div>
          <h1>Members</h1>
          <div className="activeContainer">
            <h2>
              {users.map((user) => (
                <div key={user?._id} className="activeItem">
                  {user?.username}
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserBar;
