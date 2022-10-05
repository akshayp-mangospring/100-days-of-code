import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://localhost:3000', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <h1>Sieg Heil!</h1>
  );
}

export default App;
