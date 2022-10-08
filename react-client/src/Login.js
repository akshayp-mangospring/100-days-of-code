import React, { useState } from 'react';

function Login({ setShowLogin, }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = () => {
    fetch('http://localhost:3000/login', {
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
        setShowLogin(false);
      });
  };

  const isOverlayClicked = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('overlay')) {
      setShowLogin(false);
    }
  };

  return (
    <div className="overlay" onClick={isOverlayClicked}>
      <div className="popup">
        <div className="popup-header">
          <h2>Login</h2>
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
          <button type="button" className="bottom-0" onClick={loginUser}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
