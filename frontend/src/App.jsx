import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Farmers from "./pages/Farmers";
import CropUploads from "./pages/CropUploads";
import MarketPrices from "./pages/MarketPrices";
import Schemes from "./pages/Schemes";

import FarmerSignup from "./pages/FarmerSignup";
import FarmerLogin from "./pages/FarmerLogin";
import ForgotPassword from "./pages/ForgotPassword";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerMarketPrices from "./pages/FarmerMarketPrices";
import CropUpload from "./pages/CropUpload";
import FarmerSchemes from "./pages/FarmerSchemes";
import Weather from "./pages/Weather";
import DiseaseDetection from "./pages/DiseaseDetection";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <>
              <ProtectedRoute authKey="admin" fallbackPath="/admin-login" />
              <AdminDashboard />
            </>
          }
        />
        <Route
          path="/farmers"
          element={
            <>
              <ProtectedRoute authKey="admin" fallbackPath="/admin-login" />
              <Farmers />
            </>
          }
        />
        <Route
          path="/crop-uploads"
          element={
            <>
              <ProtectedRoute authKey="admin" fallbackPath="/admin-login" />
              <CropUploads />
            </>
          }
        />
        <Route
          path="/market-prices"
          element={
            <>
              <ProtectedRoute authKey="admin" fallbackPath="/admin-login" />
              <MarketPrices />
            </>
          }
        />
        <Route
          path="/schemes"
          element={
            <>
              <ProtectedRoute authKey="admin" fallbackPath="/admin-login" />
              <Schemes />
            </>
          }
        />

        <Route path="/farmer-signup" element={<FarmerSignup />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/farmer-dashboard"
          element={
            <>
              <ProtectedRoute authKey="farmer" fallbackPath="/farmer-login" />
              <FarmerDashboard />
            </>
          }
        />
        <Route
          path="/farmer-market-prices"
          element={
            <>
              <ProtectedRoute authKey="farmer" fallbackPath="/farmer-login" />
              <FarmerMarketPrices />
            </>
          }
        />
        <Route
          path="/upload-crop"
          element={
            <>
              <ProtectedRoute authKey="farmer" fallbackPath="/farmer-login" />
              <CropUpload />
            </>
          }
        />
        <Route
          path="/farmer-schemes"
          element={
            <>
              <ProtectedRoute authKey="farmer" fallbackPath="/farmer-login" />
              <FarmerSchemes />
            </>
          }
        />
        <Route
          path="/weather"
          element={
            <>
              <ProtectedRoute authKey="farmer" fallbackPath="/farmer-login" />
              <Weather />
            </>
          }
        />
        <Route
          path="/disease-detection"
          element={
            <>
              <ProtectedRoute authKey="farmer" fallbackPath="/farmer-login" />
              <DiseaseDetection />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

