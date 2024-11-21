import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CreateRoomPage from "./pages/CreateRoomPage";
import CreateRoomDataBasic from "./pages/CreateRoomDataBasic";
import CreateRoomPuzzle from "./pages/CreateRoomPuzzle";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-room"
          element={
            <ProtectedRoute>
              <CreateRoomPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-room-details"
          element={
            <ProtectedRoute>
              <CreateRoomDataBasic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-room-puzzles/:roomId"
          element={
            <ProtectedRoute>
              <CreateRoomPuzzle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
