import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateLayout from "../components/PrivateLayot";
import { useReadUser } from "../APIs/auth";
import Corpora from "@/Pages/Private/Admin/Corpora";
import Agents from "@/Pages/Private/Admin/Agents";
import Settings from "@/Pages/Private/Admin/Settings";

const Dashboard = lazy(() => import("../Pages/Private/Admin/Dashboard"));

const PrivateRoutes = () => {
  const { isLoading } = useReadUser();
  const validUser = useSelector((state) => state.user);

  if (isLoading) {
    return <div className='loading'></div>;
  } else {
    return validUser ? (
      <PrivateLayout>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/corpora' element={<Corpora />} />
          <Route path='/agents' element={<Agents />} />
          <Route path='/settings' element={<Settings />} />

          <Route
            path='*'
            element={<Navigate to='/admin/dashboard' replace={true} />}
          />
        </Routes>
      </PrivateLayout>
    ) : (
      <Navigate to='/auth/login' replace={true} />
    );
  }
};

export default PrivateRoutes;
