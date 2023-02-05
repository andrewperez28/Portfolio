import React from "react";
import WorkoutsTable from "../components/WorkoutsTable";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function HomePage({ setWorkout }) {
  // Using history for updating
  const history = useHistory();

  // Use state to bring in the data from the backend
  const [workouts, setWorkouts] = useState([]);

  // Retrieve the list of workouts
  const loadWorkouts = async () => {
    const response = await fetch("/exercises");
    const workouts = await response.json();
    console.log(workouts);
    setWorkouts(workouts);
  };

  // Update a workout
  const onEditWorkout = async (workout) => {
    setWorkout(workout);
    history.push("/edit-workout");
  };

  // Delete a workout
  const onDeleteWorkout = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      const getResponse = await fetch("/exercises");
      const workouts = await getResponse.json();
      setWorkouts(workouts);
    } else {
      console.error(
        `Failed to delete workout with _id = ${_id}, status code = ${response.status}`
      );
    }
  };

  // Load the workouts
  useEffect(() => {
    loadWorkouts();
  }, []);

  // Display the workouts using a table
  return (
    <>
      <article>
        <WorkoutsTable
          workouts={workouts}
          onEdit={onEditWorkout}
          onDelete={onDeleteWorkout}
        />
      </article>
    </>
  );
}

export default HomePage;
