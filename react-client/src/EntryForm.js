import React from 'react';

function EntryForm({ setShowEntry }) {
  const entryData = {};

  const submitEntry = () => {
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entryData)
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  };

  const isOverlayClicked = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('overlay')) {
      setShowEntry(false);
    }
  };

  return (
    <div className="overlay" onClick={isOverlayClicked}>
      <div className="popup">
        <div className="popup-content">
          <label htmlFor="carbs">Carbs</label>
          <input id="carbs" type="text" />
          <button type="button" onClick={submitEntry}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default EntryForm;
