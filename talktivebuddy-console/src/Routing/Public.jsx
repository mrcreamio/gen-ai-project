import { lazy } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";

const Login = lazy(() => import("../Pages/auth/SignIn"));
const Signup = lazy(() => import("../Pages/auth/Register"));
const ForgotPassword = lazy(() => import("../Pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../Pages/auth/ResetPassword"));
const PageNotFound = lazy(() => import("../Pages/auth/404"));

const PublicRoutes = () => {
  const validUser = useSelector((state) => state.user);

  return !validUser ? (
    <PublicLayout>
      <Routes>
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/forgetPassword' element={<ForgotPassword />} />
        <Route path='/auth/resetPassword' element={<ResetPassword />} />
      </Routes>
    </PublicLayout>
  ) : (
    <Navigate to='/admin/dashboard' replace={true} />
  );
};

export default PublicRoutes;
