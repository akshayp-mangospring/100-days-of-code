import React from 'react';
import backendUrl from '../utils/env';

function DeleteMealPopup({ setShowDelete, mealDetails, setMealDetails, setMeals, meals }) {
  const { id, meal_type: name } = mealDetails;

  const filterMeals = () => meals.filter((m) => m.id !== id);

  const deleteMeal = () => {
    fetch(`${backendUrl}/entries/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((r) => r.json())
      .then(() => {
        setShowDelete(false);
        setMeals(filterMeals);
        setMealDetails({});
      });
  };

  const isOverlayClicked = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('overlay')) {
      setShowDelete(false);
      setMealDetails({});
    }
  };

  return (
    <div className="overlay" onClick={isOverlayClicked}>
      <div className="popup">
        <div className="popup-header">
          <h2>Delete Meal</h2>
        </div>
        <div className="popup-content">
          <p>Are you sure you want to delete <span className="bold">{name}</span>?</p>
        </div>
        <div className="popup-bottom">
          <button type="button" className="bottom-0" onClick={deleteMeal}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMealPopup;
