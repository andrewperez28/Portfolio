import React from "react";
import WorkoutsTableRow from "./WorkoutsTableRow";

function WorkoutsTable({ workouts, onEdit, onDelete }) {
  return (
    <table>
      <caption>
        <h2>Add and edit your workouts here!</h2>
        <p>
          Click on "Add Workout" to add a workout. After adding a workout, click
          on the icon under the "Edit" column to edit that row's workout. Click
          on the icon under the "Delete" column to delete that row's workout.
          Now crank out those reps!
        </p>
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Unit</th>
          <th>Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout, i) => (
          <WorkoutsTableRow
            workout={workout}
            key={i}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default WorkoutsTable;
