import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Principal from "../pages/Principal";

function PrivateRoute({ children }) {
  return auth.currentUser ? children : <Navigate to="/" replace />;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route 
          path="/principal" 
          element={
            <PrivateRoute>
              <Principal />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;