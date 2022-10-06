import React from 'react';

function DeleteMealPopup({ setShowDelete, mealDetails, setMealDetails, setMeals, meals }) {
  const {id, meal_type: name} = mealDetails;

  const deleteMeal = () => {
    fetch(`http://localhost:3000/entries/${id}`, {
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

  const filterMeals = () => meals.filter((m) => m.id !== id);

  const isOverlayClicked = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains('overlay')) {
      setShowDelete(false);
    }
  };

  return (
    <div className="overlay" onClick={isOverlayClicked}>
      <div className="popup">
        <h4>Delete Meal</h4>
        <div className="popup-content">
          <p>Are you sure you want to delete {name}?</p>
        </div>
        <button type="button" onClick={deleteMeal}>Submit</button>
      </div>
    </div>
  );
}

export default DeleteMealPopup;
