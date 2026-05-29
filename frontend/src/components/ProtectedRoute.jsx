import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ authKey, fallbackPath }) {
  const location = useLocation();
  const authed = Boolean(localStorage.getItem(authKey));

  if (!authed) {
    return <Navigate to={fallbackPath} replace state={{ from: location }} />;
  }

  return null;
}

export default ProtectedRoute;

