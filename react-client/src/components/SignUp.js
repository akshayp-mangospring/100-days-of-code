import React, { useState } from 'react';
import backendUrl from '../utils/env';

function SignUp({ setShowSignup, }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createUser = () => {
    fetch(`${backendUrl}/signup`, {
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
        setShowSignup(false);
      });
  };

  const isOverlayClicked = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('overlay')) {
      setShowSignup(false);
    }
  };

  return (
    <div className="overlay" onClick={isOverlayClicked}>
      <div className="popup">
        <div className="popup-header">
          <h2>Sign up</h2>
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
          <button type="button" className="bottom-0" onClick={createUser}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
