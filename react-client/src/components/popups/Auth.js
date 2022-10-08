import React, { useState } from 'react';

function AuthPopup({ endpointUrl, header, setShowAuthPopup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authenticateUser = () => {
    fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: username,
        password,
      })
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        setShowAuthPopup(false);
      });
  };

  const isOverlayClicked = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('overlay')) {
      setShowAuthPopup(false);
    }
  };

  return (
    <div className="overlay" onClick={isOverlayClicked}>
      <div className="popup">
        <div className="popup-header">
          <h2>{header}</h2>
        </div>
        <div className="popup-content">
          <div>
            <label htmlFor="user_name">Username</label>
            <input id="user_name" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="popup-bottom">
          <button type="button" className="bottom-0" onClick={authenticateUser}>{header}</button>
        </div>
      </div>
    </div>
  );
}

export default AuthPopup;
