import React, { useEffect, useState } from 'react';
import NewMealForm from "./NewMealForm";

function App() {
  const [meals, setMeals] = useState([]);
  const [showEntry, setShowEntry] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000', {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((r) => r.json())
      .then((res) => setMeals(res));
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Meals</h1>
        <button type="button" onClick={() => setShowEntry(!showEntry)}>New Meal</button>
      </div>
      {showEntry && <NewMealForm setShowEntry={setShowEntry} />}
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
