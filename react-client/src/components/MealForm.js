import React, { useEffect, useState } from 'react';
import backendUrl from '../utils/env';

function MealForm({
  isNew,
  setShowEntry,
  meals,
  setMeals,
  mealDetails: propMealDetails,
  setMealDetails: propSetMealDetails
}) {
  const [mealDetails, setMealDetails] = useState(propMealDetails);
  const [formValid, setFormValid] = useState(false);
  const { id, calories, carbs, fats, meal_type, proteins } = mealDetails;

  useEffect(() => {
    const { calories, carbs, fats, meal_type, proteins } = mealDetails;
    const vals = [calories, carbs, fats, proteins];
    let disableBtn = false;

    for (let i = 0; i < vals.length; i++) {
      const el = vals[i];

      if (isNaN(el) || typeof el === 'undefined' || el === '' || el < 0) {
        disableBtn = true;
        break;
      }
    }

    if (typeof meal_type === 'undefined' || meal_type === '') {
      disableBtn = true;
    }

    setFormValid(disableBtn);
  }, [mealDetails]);

  const getAddedMeals = (r) => [...meals, r];

  const getUpdatedMeals = (r) => (
    meals.map((m) => {
      if (m.id === r.id) {
        return r;
      }
      return m;
    })
  );

  const requestData = (() => {
    const getUrl = () => isNew ? `${backendUrl}/entries` : `${backendUrl}/entries/${id}`;
    const getMethod = () => isNew ? 'POST' : 'PUT';
    const getUpdateFunc = () => isNew ? getAddedMeals : getUpdatedMeals;
    const getDialogHeader = () => isNew ? 'New Meal' : 'Edit Meal';

    return {
      url: getUrl(),
      method: getMethod(),
      updateFunc: getUpdateFunc(),
      dialogHeader: getDialogHeader(),
    }
  })();

  const { url, method, updateFunc, dialogHeader } = requestData;

  const changeMealDetails = (e) => {
    const val = e.currentTarget.value;
    const parsedVal = e.currentTarget.type === 'number' && val.isNotEmpty() ? parseFloat(val || 0, 10) : val;

    setMealDetails({
      ...mealDetails,
      [e.currentTarget.id]: parsedVal,
    });
  };

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
        setMeals(updateFunc(res));
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
        <div className="popup-header">
          <h2>{dialogHeader}</h2>
        </div>
        <div className="popup-content">
          <div>
            <label htmlFor="meal_type">Type</label>
            <input id="meal_type" type="text" value={meal_type || ''} onChange={changeMealDetails} />
          </div>
          <div>
            <label htmlFor="calories">Calories</label>
            <input id="calories" type="number" value={calories || ''} onChange={changeMealDetails} />
          </div>
          <div>
            <label htmlFor="proteins">Proteins</label>
            <input id="proteins" type="number" value={proteins || ''} onChange={changeMealDetails} />
          </div>
          <div>
            <label htmlFor="fats">Fats</label>
            <input id="fats" type="number" value={fats || ''} onChange={changeMealDetails} />
          </div>
          <div>
            <label htmlFor="carbs">Carbs</label>
            <input id="carbs" type="number" value={carbs || ''} onChange={changeMealDetails} />
          </div>
        </div>
        <div className="popup-bottom">
          <button type="button" className="bottom-0" onClick={submitMeal} disabled={formValid}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default MealForm;
