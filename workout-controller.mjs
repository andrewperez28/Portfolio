import "dotenv/config";
import express from "express";
import * as workouts from "./workout-model.mjs";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// Create controller
app.post("/exercises", (req, res) => {
  workouts
    .createWorkout(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((workout) => {
      res.status(201).json(workout);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        Error:
          "Creation of workout failed due to invalid syntax. Please fix the syntax and try again.",
      });
    });
});

//Retrieve Controller
// Getting all workouts
app.get("/exercises", (req, res) => {
  workouts.findWorkouts().then((workouts) => res.status(200).json(workouts));
});

// Getting workouts by ID
app.get("/exercises/:_id", (req, res) => {
  const workoutId = req.params._id;
  workouts
    .findWorkoutById(workoutId)
    .then((workout) => {
      if (workout !== null) {
        res.json(workout);
      } else {
        res.status(404).json({ Error: "Workout not found" });
      }
    })
    .catch((error) => console.error(error));
});

// Function that checks if the date is valid
function dateCheck(date) {
  for (let i = 0; i < date.length; i++) {
    let character = date[i];
    if (i === 4 || i === 7) {
      if (character !== "-") {
        return false;
      }
    } else {
      if (isNaN(parseInt(character))) {
        return false;
      }
    }
  }
  return true;
}

// Function that checks if the body of a request(data) is valid, each property must not be undefined and adhere to property requirements
const validCheck = (data) => {
  let valid = false;
  if (data.name !== undefined && typeof data.name === "string") {
    if (data.name.length === 0) {
      // Name is blank
      console.log("invalid name");
      valid = false;
    } else {
      valid = true;
    }

    if (data.reps !== undefined && typeof data.reps === "number") {
      if (data.reps < 0) {
        // Reps are negative
        console.log("invalid reps"); // These are used for debugging
        valid = false;
      } else {
        valid = true;
      }
    }
    if (data.weight !== undefined && typeof data.weight === "number") {
      if (data.weight < 0) {
        // Weight is negative
        console.log("invalid weight");
        valid = false;
      } else {
        valid = true;
      }
    }
    if (data.unit !== undefined && typeof data.unit === "string") {
      const units = ["kgs", "lbs", "miles"];
      if (!units.includes(data.unit)) {
        console.log(units.includes(data.unit));
        // Unit is invalid
        console.log("invalid unit");
        valid = false;
      } else {
        valid = true;
      }
    }
    if (data.date !== undefined && typeof data.date === "string") {
      if (!dateCheck(data.date)) {
        console.log("invalid date");
        // Using dateCheck function
        valid = false;
      } else {
        valid = true;
      }
    }
  }
  return valid;
};

//Update controller
app.put("/exercises/:_id", (req, res) => {
  console.log(req.body);
  const valid = validCheck(req.body);
  if (valid === false) {
    res.status(400).json({ Error: "VALID IS MESSED UP" });
    return;
  }

  workouts
    .replaceWorkout(
      req.params._id,
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: req.params._id,
          name: req.body.name,
          reps: req.body.reps,
          weight: req.body.weight,
          unit: req.body.unit,
          date: req.body.date,
        });
      } else {
        res.status(400).json({ Error: "Request to update workout has failed" });
      }
    });
});

//Delete controller
app.delete("/exercises/:_id", (req, res) => {
  workouts.deleteById(req.params._id).then((deletedCount) => {
    if (deletedCount === 1) {
      res.status(204).send();
    } else {
      res
        .status(404)
        .json({ Error: "Exercise does not exist. Failed to fufill request." });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
