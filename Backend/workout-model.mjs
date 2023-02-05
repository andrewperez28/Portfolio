import mongoose from "mongoose";
import "dotenv/config";

// Connect based on the .env file parameters.
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
  if (err) {
    res.status(500).json({ error: "500:Connection to the server failed." });
  } else {
    console.log(
      "Successfully connected to MongoDB Workout collection using Mongoose."
    );
  }
});

// The Schema of the collection, calling it workout
const workoutSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: Date, required: true },
});

// Making the model from the schema
const Workout = mongoose.model("Workout", workoutSchema);

// Create model for Workout
const createWorkout = async (name, reps, weight, unit, date) => {
  const workout = new Workout({
    name: name,
    reps: reps,
    weight: weight,
    unit: unit,
    date: date,
  });
  return workout.save();
};

// Retrieve for workouts based on a filter, which returns a promise
const findWorkouts = async (filter) => {
  const query = await Workout.find(filter);
  return query;
};

// Retrieve for workouts based on the ID and returns a promise
const findWorkoutById = async (_id) => {
  const query = Workout.findById(_id);
  return query.exec();
};

// Replace model for workouts
const replaceWorkout = async (_id, name, reps, weight, unit, date) => {
  const result = await Workout.replaceOne(
    { _id: _id },
    {
      name: name,
      reps: reps,
      weight: weight,
      unit: unit,
      date: date,
    }
  );

  return result.modifiedCount;
};

// Delete model for workouts based on ID
const deleteById = async (_id) => {
  const result = await Workout.deleteOne({ _id: _id });
  return result.deletedCount;
};

// Exports
export {
  createWorkout,
  findWorkouts,
  findWorkoutById,
  replaceWorkout,
  deleteById,
};
