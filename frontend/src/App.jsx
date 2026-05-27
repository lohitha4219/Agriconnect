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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="/crop-uploads" element={<CropUploads />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/farmer-signup" element={<FarmerSignup />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer-market-prices" element={<FarmerMarketPrices />} />
        <Route path="/upload-crop" element={<CropUpload />} />
        <Route path="/farmer-schemes" element={<FarmerSchemes />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;