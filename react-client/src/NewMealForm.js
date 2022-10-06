import React from 'react';

function NewMealForm({ setShowEntry }) {
  const submitEntry = () => {
    const entryData = {};
    const labels = document.querySelectorAll('#meal-points label');

    for (let i = 0; i < labels.length; i++) {
      const el = labels[i];
      const input = el.nextElementSibling;
      const key = input.id;
      const value = input.value;

      entryData[key] = value;
    }

    fetch('http://localhost:3000/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entryData)
    })
      .then((r) => r.json())
      .then((res) => {
        console.log(res);
        setShowEntry(false);
      });
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
        <h4>Make a Meal Entry</h4>
        <div className="popup-content">
          <div id="meal-points">
            <div>
              <label htmlFor="meal_type">Type</label>
              <input id="meal_type" type="text" />
            </div>
            <div>
              <label htmlFor="calories">Calories</label>
              <input id="calories" type="number" />
            </div>
            <div>
              <label htmlFor="proteins">Proteins</label>
              <input id="proteins" type="number" />
            </div>
            <div>
              <label htmlFor="fats">Fats</label>
              <input id="fats" type="number" />
            </div>
            <div>
              <label htmlFor="carbs">Carbs</label>
              <input id="carbs" type="number" />
            </div>
          </div>
        </div>
        <button type="button" onClick={submitEntry}>Submit</button>
      </div>
    </div>
  );
}

export default NewMealForm;
