import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const EditWorkoutPage = ({ workout }) => {
  const [name, setName] = useState(workout.name);
  const [reps, setReps] = useState(workout.reps);
  const [weight, setWeight] = useState(workout.weight);
  const [unit, setUnit] = useState(workout.unit);
  const [date, setDate] = useState(
    workout.date.toLocaleString("en-US").slice(0, 10)
  );

  const history = useHistory();

  const editWorkout = async () => {
    const response = await fetch(`/exercises/${workout._id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        reps: Number(reps),
        weight: Number(weight),
        unit: unit,
        date: date,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Successfully edited the workout! You gonna get swole!");
    } else {
      const errorMessage = await response.json();
      alert(
        `Failed to update the workout. You can't get swole if you don't fix this -> ${response.status}. ${errorMessage.Error}`
      );
    }
    history.push("/");
  };

  return (
    <>
      <article>
        <h2>Edit the details of your workout session</h2>
        <p>
          Be sure to enter your details correctly. No blank inputs or negative
          values allowed.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <fieldset>
            <label for="Exercise Name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />

            <label for="Number of Reps">Reps</label>
            <input
              type="Number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              id="reps"
            />

            <label for="Amount of Weight">Weight</label>
            <input
              type="Number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              id="weight"
            />

            <label for="Type of units">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              id="unit"
            >
              <option value="kgs">kgs</option>
              <option value="lbs">lbs</option>
              <option value="miles">miles</option>
            </select>

            <label for="Date Completed">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
            />

            <label for="submit">
              <button onClick={editWorkout} id="submit">
                Change this session!
              </button>
            </label>
          </fieldset>
        </form>
      </article>
    </>
  );
};

export default EditWorkoutPage;
