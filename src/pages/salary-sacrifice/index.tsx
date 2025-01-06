import React from 'react';
import { Routes, Route, Navigate, useLocation, Location } from 'react-router-dom';
import SalaryVehicleList from './SalaryVehicleList';
import SalaryVehicleDetails from './details/SalaryVehicleDetails';
import EditSalaryVehicle from './edit/[id]';

function RedirectToDetails() {
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  return <Navigate to={`/salary-sacrifice/details/${id}`} replace />;
}

export default function SalarySacrificePage() {
  return (
    <Routes>
      <Route index element={<SalaryVehicleList />} />
      <Route path="details/:id" element={<SalaryVehicleDetails />} />
      <Route path=":id" element={<RedirectToDetails />} />
      <Route path="edit/:id" element={<EditSalaryVehicle />} />
      <Route path="*" element={<Navigate to="/salary-sacrifice" replace />} />
    </Routes>
  );
}
