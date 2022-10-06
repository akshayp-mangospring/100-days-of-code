import React, { useState } from 'react';

function MealForm({
  isNew,
  setShowEntry,
  meals,
  setMeals,
  mealDetails: propMealDetails,
  setMealDetails: propSetMealDetails
}) {
  const [mealDetails, setMealDetails] = useState(propMealDetails);
  const { id, calories, carbs, fats, meal_type, proteins } = mealDetails;

  const requestData = (() => {
    const getUrl = () => isNew ? 'http://localhost:3000/entries' : `http://localhost:3000/entries/${id}`;
    const getMethod = () => isNew ? 'POST' : 'PUT';

    return {
      url: getUrl(),
      method: getMethod(),
    }
  })();

  const { url, method } = requestData;

  const changeMealDetails = (e) => {
    const val = e.currentTarget.value;
    const parsedVal = e.currentTarget.type === 'number' ? parseFloat(val, 10) : val;

    setMealDetails({
      ...mealDetails,
      [e.currentTarget.id]: parsedVal,
    });
  };

  const getUpdatedMeals = (r) => (
    meals.map((m) => {
      if (m.id === r.id) {
        return r;
      }
      return m;
    })
  );

  const submitMeal = () => {
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mealDetails)
    })
      .then((r) => r.json())
      .then((res) => {
        setShowEntry(false);
        setMeals(getUpdatedMeals(res));
        propSetMealDetails({});
      });
  };

  const isOverlayClicked = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('overlay')) {
      setShowEntry(false);
      propSetMealDetails({});
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
              <input id="meal_type" type="text" value={meal_type || ''} onChange={changeMealDetails} />
            </div>
            <div>
              <label htmlFor="calories">Calories</label>
              <input id="calories" type="number" value={calories || 0} onChange={changeMealDetails} />
            </div>
            <div>
              <label htmlFor="proteins">Proteins</label>
              <input id="proteins" type="number" value={proteins || 0} onChange={changeMealDetails} />
            </div>
            <div>
              <label htmlFor="fats">Fats</label>
              <input id="fats" type="number" value={fats || 0} onChange={changeMealDetails} />
            </div>
            <div>
              <label htmlFor="carbs">Carbs</label>
              <input id="carbs" type="number" value={carbs || 0} onChange={changeMealDetails} />
            </div>
          </div>
        </div>
        <button type="button" onClick={submitMeal}>Submit</button>
      </div>
    </div>
  );
}

export default MealForm;
