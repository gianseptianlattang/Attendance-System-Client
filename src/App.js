import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLandingPage from "./pages/AdminLandingPage";
import EmployeeLandingPage from "./pages/EmployeeLandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/admin" element={<AdminLandingPage />}></Route>
        <Route path="/employee" element={<EmployeeLandingPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
