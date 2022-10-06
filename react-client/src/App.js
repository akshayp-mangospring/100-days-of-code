import React, { useEffect, useState } from 'react';
import DeleteMealPopup from './DeleteMealPopup';
import MealForm from './MealForm';

function App() {
  const [meals, setMeals] = useState([]);
  const [mealDetails, setMealDetails] = useState({});
  const [showEntry, setShowEntry] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((r) => r.json())
      .then((res) => setMeals(res));
  }, []);

  const getCurrentMeal = (el) => {
    const elId = parseInt(el.getAttribute('data-id'));
    const clickedMeal = meals.filter(({ id }) => id === elId);

    return clickedMeal[0];
  };

  const editEntry = (e) => {
    setMealDetails(getCurrentMeal(e.currentTarget));
    setShowEntry(true);
  };

  const deleteEntry = (e) => {
    setMealDetails(getCurrentMeal(e.currentTarget));
    setShowDelete(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Meals</h1>
        <button type="button" onClick={() => setShowEntry(!showEntry)}>New Meal</button>
      </div>
      {showEntry && (
        <MealForm
          isNew={Object.keys(mealDetails).length === 0}
          mealDetails={mealDetails}
          meals={meals}
          setMeals={setMeals}
          setMealDetails={setMealDetails}
          setShowEntry={setShowEntry}
        />
      )}
      {showDelete && (
        <DeleteMealPopup
          setShowDelete={setShowDelete}
          meals={meals}
          setMeals={setMeals}
          mealDetails={mealDetails}
          setMealDetails={setMealDetails}
        />
      )}
      {
        meals.length ? (
          <ul>
            {
              meals.map(({ calories, carbs, fats, id, meal_type, proteins }) => (
                <li key={id}>
                  <p>Name: {meal_type}</p>
                  <p>Calories: {calories}</p>
                  <p>Fats: {fats}</p>
                  <p>Carbs: {carbs}</p>
                  <p>Proteins: {proteins}</p>
                  <div className="d-flex justify-content-end">
                    <button data-id={id} onClick={editEntry}>Edit</button>
                    <button className="left-5" data-id={id} onClick={deleteEntry}>Delete</button>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : <h1>No Meals</h1>
      }
    </>
  );
}

export default App;
