import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const CreateWorkoutPage = () => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [date, setDate] = useState("");

  const history = useHistory();

  const addWorkout = async () => {
    const newWorkout = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "post",
      body: JSON.stringify(newWorkout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      alert("Succesfully added the workout! You gonna get swole!");
    } else {
      const errorMessage = await response.json();
      alert(
        `Failed to add workout. You can't get swole if you don't fix this: ${response.status}. ${errorMessage.Error}`
      );
    }
    history.push("/");
  };

  return (
    <>
      <article>
        <h2>Enter the details of your workout session</h2>
        <p>
          Be sure to enter your details correctly. No blanks or negative values
          allowed.
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
              placeholder="Name of Exercise"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
            />

            <label for="Number of Reps">Reps</label>
            <input
              type="Number"
              placeholder="Number of Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              id="reps"
            />

            <label for="Amount of Weight">Weight</label>
            <input
              type="Number"
              placeholder="Amount of Weight"
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
              placeholder="Date Completed (MM-DD-YYYY)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
            />

            <label for="submit">
              <button type="submit" onClick={addWorkout} id="submit">
                Log this session!
              </button>
            </label>
          </fieldset>
        </form>
      </article>
    </>
  );
};
export default CreateWorkoutPage;
