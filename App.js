// Dependenices being imported
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

// Components and CSS being imported
import "./App.css";
import Nav from "./components/Nav";
import WorkoutsTable from "./components/WorkoutsTable";
import WorkoutsTableRow from "./components/WorkoutsTableRow";

// Pages being imported
import CreateWorkoutPage from "./pages/CreateWorkoutPage";
import EditWorkoutPage from "./pages/EditWorkoutPage";
import HomePage from "./pages/HomePage";

function App() {
  const [workout, setWorkout] = useState([]);

  return (
    <>
      <Router>
        <header>
          <h1>Welcome to Swoleville!</h1>
          <h2> The premier fitness tracker app!</h2>
          <p>"Git gud, git swole!!!"</p>
        </header>

        <Nav />

        <main>
          <Route path="/" exact>
            <HomePage setWorkout={setWorkout} />
          </Route>

          <Route path="/create-workout">
            <CreateWorkoutPage />
          </Route>

          <Route path="/edit-workout">
            <EditWorkoutPage workout={workout} />
          </Route>
        </main>

        <footer>
          <p>© 2022 Andrew Perez</p>
        </footer>
      </Router>
    </>
  );
}

export default App;
