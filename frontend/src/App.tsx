import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Header from "./components/headers/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col">

    <Router>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='' element={<Login/>}/>
      </Routes>
    </Router>
    <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </AuthProvider>
  );
}

export default App;
