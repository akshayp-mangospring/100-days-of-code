import React, { useEffect, useState } from 'react';
import EntryForm from "./EntryForm";

function App() {
  const [foodItems, setFoodItems] = useState([]);
  const [showEntry, setShowEntry] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((r) => r.json())
      .then((data) => setFoodItems(data));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Food Entries</h1>
        <button type="button" onClick={() => setShowEntry(!showEntry)}>New Entry</button>
      </div>
      {showEntry && <EntryForm setShowEntry={setShowEntry} />}
      {
        foodItems.length ? (
          <ul>
            <li></li>
          </ul>
        ) : <h1>No Food Items</h1>
      }
    </>
  );
}

export default App;
