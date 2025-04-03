import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import StoreToShop from "../pages/StoreToShop";
import ProductToStore from "../pages/ProductToStore";
import TodaySales from "../pages/TodaySales";
import DashboardLayout from "../layout/DashboardLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import VerifyEmail from "../pages/VerifyEmail";
import Login from "../auth/Login";
import Register from "../auth/Register";
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";
import EmployeeLayout from "../layout/EmployeeLayout";
import UsersPage from "../pages/organizer/UsersPage";
import DocumentForm from "../pages/DocumentForm";
import UserProduct from "../pages/organizer/UserProduct";
import ProductDetail from "../pages/organizer/ProductDetail";

const AppRoutes: React.FC = () => {
  const [] = React.useState<any>(null); // This should be set based on your auth logic

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/" element={<Login />} />

        {/* Protected Routes - Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "organizer", "employee"]} />}>
        <Route element={<ProtectedRoute allowedRoles={["admin", "organizer"]} />}> 
            {/* Admin & Organizer */}
 
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="storetoshop" element={<StoreToShop />} />
              <Route path="register" element={<Register />} />
              <Route path="users" element={<UsersPage/>} />
              <Route path="uploaded-product" element={<UserProduct/>} />
              <Route path="uploaded-product-detail" element={<ProductDetail/>} />
              <Route path="product-to-store" element={<ProductToStore />} />
              <Route path="document" element={<DocumentForm />} />
              <Route path="today-sales" element={<TodaySales />} />
            {/* </Route> */}
          </Route>
          
            {/* Admin-only Routes */}
            {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="admin" element={<div>Admin Page</div>} /> {/* Replace with actual admin content */}
            </Route>
            </Route>

            {/* Employee-only Routes */}
           
            <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
              <Route path="/employee" element={<EmployeeLayout />}>
                <Route index  element={<EmployeeDashboard />} />
                <Route path="storetoshop" element={<StoreToShop />} />
                <Route path="document" element={<DocumentForm />} />
                <Route path="product-to-store" element={<ProductToStore />} />
              </Route>
          </Route>
        </Route>

        {/* Default Route - redirect to login if no match */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
