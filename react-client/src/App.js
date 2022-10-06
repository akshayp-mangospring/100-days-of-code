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
    <div className="container">
      <div className="flex justify-content-between align-items-center p-10">
        <h1 className="semi-bold">Meals</h1>
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
                  <h3>{meal_type}</h3>
                  <p className="bottom-0">
                    <span className="semi-bold">Calories:</span>
                    <span className="left-5">{calories}</span>
                  </p>
                  <p className="bottom-0">
                    <span className="semi-bold">Fats:</span>
                    <span className="left-5">{fats}</span>
                  </p>
                  <p className="bottom-0">
                    <span className="semi-bold">Carbs:</span>
                    <span className="left-5">{carbs}</span>
                  </p>
                  <p className="bottom-0">
                    <span className="semi-bold">Proteins:</span>
                    <span className="left-5">{proteins}</span>
                  </p>
                  <div className="flex justify-content-end">
                    <button data-id={id} onClick={editEntry}>Edit</button>
                    <button className="left-5" data-id={id} onClick={deleteEntry}>Delete</button>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : <h1>No Meals</h1>
      }
    </div>
  );
}

export default App;
