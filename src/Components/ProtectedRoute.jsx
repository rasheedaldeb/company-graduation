import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const token = localStorage.getItem("companytoken");

  return token ? <Outlet /> : <Navigate to="/company-signin" replace={true} />;
};

export default ProtectedRoute;
